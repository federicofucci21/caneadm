import { InjectRepository } from '@nestjs/typeorm';
import { totalPrice } from '../helpers/total';
import { Repository, UpdateResult } from 'typeorm';
import { OrderUpdateDTO, ProductsForOrderUpdateDTO } from './dto/order.dto';
import { OrderEntity } from './entities/order.entity';
import { ProductsForOrderEntity } from './entities/productOrder.entity';
import { ProductEntity } from '../product/entities/product.entity';

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
      return await this.orderRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findOneById(id: number): Promise<OrderEntity> {
    try {
      return await this.orderRepository
        .createQueryBuilder('orders')
        .where({ id })
        .leftJoinAndSelect('orders.user', 'user')
        .leftJoinAndSelect('orders.productsForOrder', 'productsForOrder')
        .leftJoinAndSelect('productsForOrder.product', 'product')
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateOrder(
    id: number,
    body: Array<ProductsForOrderUpdateDTO>,
  ): Promise<OrderEntity | string> {
    try {
      const order: OrderEntity = await this.orderRepository
        .createQueryBuilder('orders')
        .where({ id })
        .getOne();

      if (!order) {
        return `Order number ${id} doesn't found`;
      }

      body.forEach(async (e) => {
        const prodId = e.product.id;
        const productStock = await this.productRepository
          .createQueryBuilder('product')
          .where({ id: prodId })
          .getOne();
        const lastStock = await this.productOrderRepository
          .createQueryBuilder('products_for_order_entity')
          .where({ orderInclude: id })
          .andWhere({ product: prodId })
          .getOne();
        const body = {
          stock: productStock.stock + lastStock.quantity,
        };
        await this.productRepository.update(prodId, body);
      });

      await this.productOrderRepository.delete({
        orderInclude: await this.findOneById(id),
      });

      const products = await this.productOrderRepository.save(body);

      console.log('PRODUCT', products);

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

      return await this.orderRepository.save(newOrder);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateStateOrder(
    id: number,
    body: OrderUpdateDTO,
  ): Promise<OrderEntity | string> {
    try {
      const order: UpdateResult = await this.orderRepository.update(id, body);

      if (order.affected === 0) {
        return `Order number ${id} doesn't found`;
      }

      return await this.findOneById(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
