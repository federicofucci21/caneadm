import { Injectable, Inject } from '@nestjs/common';
import { Order } from './order.model';
import { OrderDto } from './dto/order.dto';
import { ORDER_REPOSITORY } from '../core/constants';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
  ) {}

  async create(order: OrderDto): Promise<Order> {
    return await this.orderRepository.create<Order>(order);
  }

  async findOneById(id: number): Promise<Order> {
    return await this.orderRepository.findOne<Order>({ where: { id } });
  }
}
