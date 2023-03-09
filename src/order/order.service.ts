import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';

export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  public async allOrders(): Promise<OrderEntity[]> {
    try {
      return await this.orderRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findOneById(id: number): Promise<OrderEntity | string> {
    try {
      const order = await this.orderRepository
        .createQueryBuilder('orders')
        .where({ id })
        .leftJoinAndSelect('orders.user', 'user')
        .getOne();
      return order
        ? order
        : `We don't have an order with identification ${id} on our database`;
    } catch (error) {
      throw new Error(error);
    }
  }
}
