import { OrderDTO } from './dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';

export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  public async create(order: OrderDTO): Promise<OrderEntity> {
    try {
      return await this.orderRepository.save(order);
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
