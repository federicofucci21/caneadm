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

  public async findOneById(id: number): Promise<OrderEntity> {
    try {
      return await this.orderRepository
        .createQueryBuilder('orders')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }
}
