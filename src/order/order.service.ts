import { InjectRepository } from '@nestjs/typeorm';
import { totalPrice } from '../helpers/total';
import { Repository, UpdateResult } from 'typeorm';
import { OrderUpdateDTO, ProductsForOrderUpdateDTO } from './dto/order.dto';
import { OrderEntity } from './entities/order.entity';
import { ProductsForOrderEntity } from './entities/productOrder.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(ProductsForOrderEntity)
    private readonly productOrderRepository: Repository<ProductsForOrderEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public async allOrders(res: Response): Promise<OrderEntity[] | Response> {
    try {
      const orders: OrderEntity[] = await this.orderRepository.find();
      if (!orders) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .header('Found', 'orders Not Found')
          .json({ message: `No orders on DataBase` });
      }
      return res
        .status(HttpStatus.FOUND)
        .header('Found', `${orders.length} orders found on DataBase`)
        .json(orders);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findOneById(
    id: number,
    res: Response,
  ): Promise<OrderEntity | Response> {
    try {
      const order: OrderEntity = await this.orderRepository
        .createQueryBuilder('orders')
        .where({ id })
        .leftJoinAndSelect('orders.user', 'user')
        .leftJoinAndSelect('orders.productsForOrder', 'productsForOrder')
        .leftJoinAndSelect('productsForOrder.product', 'product')
        .getOne();
      if (!order) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .header('Found', 'Not Found')
          .json({ message: `order with ID: ${id} do not exist` });
      } else {
        return res
          .status(HttpStatus.FOUND)
          .header('Found', `order with ID: ${id} found`)
          .json(order);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateOrder(
    id: number,
    body: Array<ProductsForOrderUpdateDTO>,
    res: Response,
  ): Promise<OrderEntity | Response> {
    try {
      const order: OrderEntity = await this.orderRepository
        .createQueryBuilder('orders')
        .where({ id })
        .getOne();

      if (!order) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .header('Found', 'Not Found')
          .json({ message: `order with ID: ${id} do not exist` });
      }

      body.forEach(async (e) => {
        const prodId = e.product.id;
        const productStock: ProductEntity = await this.productRepository
          .createQueryBuilder('product')
          .where({ id: prodId })
          .getOne();
        const lastStock: ProductsForOrderEntity =
          await this.productOrderRepository
            .createQueryBuilder('products_for_order_entity')
            .where({ orderInclude: id })
            .andWhere({ product: prodId })
            .getOne();
        const body = {
          stock: productStock.stock + lastStock.quantity,
        };
        const stockUpdated = await this.productRepository.update(prodId, body);
        if (stockUpdated.affected === 0) {
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .header('Error', 'Stock-Error')
            .json({ message: `Something goes wrong with stock` });
        }
      });

      await this.productOrderRepository.delete({
        orderInclude: await this.orderRepository.findBy({ id }),
      });

      const products = await this.productOrderRepository.save(body);

      const newOrder = {
        id,
        productsForOrder: products,
        total: totalPrice(body),
      };

      products.forEach(async (e) => {
        const prodId = e.product.id;
        const productStock = await this.productRepository.findOneBy({
          id: prodId,
        });
        const body = {
          stock: productStock.stock - e.quantity,
        };
        await this.productRepository.update(prodId, body);
      });

      const newOrderSaved = await this.orderRepository.save(newOrder);

      if (!newOrderSaved) {
        return res
          .status(HttpStatus.NOT_MODIFIED)
          .header('Found', 'Order not updated')
          .json({
            message: `The order with ID: ${id} not updated`,
          });
      }
      return res
        .status(HttpStatus.OK)
        .header('Updated', 'Order Updated')
        .json(newOrderSaved);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateStateOrder(
    id: number,
    body: OrderUpdateDTO,
    res: Response,
  ): Promise<OrderEntity | Response> {
    try {
      const order: UpdateResult | Response | any =
        await this.orderRepository.update(id, body);

      if (order.affected === 0) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .header('Found', 'order Not Found')
          .json({
            message: `The order with ID: ${id} doesn't found on database`,
          });
      }
      const orderUpdated = await this.findOneById(id, res);
      return res
        .status(HttpStatus.OK)
        .header('Updated', `The order with ID: ${id} updated`)
        .json(orderUpdated);
    } catch (error) {
      throw new Error(error);
    }
  }
}
