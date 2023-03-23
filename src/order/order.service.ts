import { InjectRepository } from '@nestjs/typeorm';
import { totalPrice } from '../helpers/total';
import { Repository, UpdateResult } from 'typeorm';
import { OrderUpdateDTO, ProductsForOrderUpdateDTO } from './dto/order.dto';
import { OrderEntity } from './entities/order.entity';
import { ProductsForOrderEntity } from './entities/productOrder.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { Response } from 'express';
import { ErrorManager } from '../helpers/error.manager';

export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(ProductsForOrderEntity)
    private readonly productOrderRepository: Repository<ProductsForOrderEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public async allOrders(): Promise<OrderEntity[]> {
    try {
      const orders: OrderEntity[] = await this.orderRepository.find();
      if (!orders) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `No orders on DataBase`,
        });
      }
      return orders;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOneById(id: number): Promise<OrderEntity> {
    try {
      const order: OrderEntity = await this.orderRepository
        .createQueryBuilder('orders')
        .where({ id })
        .leftJoinAndSelect('orders.user', 'user')
        .leftJoinAndSelect('orders.productsForOrder', 'productsForOrder')
        .leftJoinAndSelect('productsForOrder.product', 'product')
        .getOne();
      if (!order) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `order with ID: ${id} do not exist`,
        });
      }
      return order;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateOrder(
    id: number,
    body: Array<ProductsForOrderUpdateDTO>,
  ): Promise<OrderEntity> {
    try {
      const order: OrderEntity = await this.orderRepository
        .createQueryBuilder('orders')
        .where({ id })
        .getOne();

      if (!order) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `order with ID: ${id} do not exist`,
        });
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
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: `Something goes wrong with stock`,
          });
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
        throw new ErrorManager({
          type: 'NOT_MODIFIED',
          message: `The order with ID: ${id} not updated`,
        });
      }
      return newOrderSaved;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateStateOrder(
    id: number,
    body: OrderUpdateDTO,
  ): Promise<OrderEntity> {
    try {
      const order: UpdateResult | Response | any =
        await this.orderRepository.update(id, body);

      if (order.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `The order with ID: ${id} doesn't found on database`,
        });
      }
      return await this.findOneById(id);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
