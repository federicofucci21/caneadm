import { InjectRepository } from '@nestjs/typeorm';
import { totalPrice } from '../helpers/total';
import { Repository, UpdateResult } from 'typeorm';
import { OrderUpdateDTO, ProductsForOrderUpdateDTO } from './dto/order.dto';
import { OrderEntity } from './entities/order.entity';
import { ProductsForOrderEntity } from './entities/productOrder.entity';

export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(ProductsForOrderEntity)
    private readonly productOrderRepository: Repository<ProductsForOrderEntity>,
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

      await this.productOrderRepository.delete({
        orderInclude: await this.findOneById(id),
      });

      const products = await this.productOrderRepository.save(body);

      const newOrder = {
        id,
        productsForOrder: products,
        total: totalPrice(body),
      };

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
