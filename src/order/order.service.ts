import { Injectable, Inject } from '@nestjs/common';
import { Order } from './order.model';
import { OrderDto } from './dto/order.dto';
import { ORDER_REPOSITORY } from 'src/core/constants';

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
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { Order } from './order.model';

// @Injectable()
// export class OrderService {
//   constructor(
//     @InjectModel(Order)
//     private orderModel: typeof Order,
//   ) {}

//   async findAll(): Promise<Order[]> {
//     return this.orderModel.findAll();
//   }

//   findOne(id: string): Promise<Order> {
//     return this.orderModel.findOne({
//       where: {
//         id,
//       },
//     });
//   }

//   async remove(id: string): Promise<void> {
//     const order = await this.findOne(id);
//     await order.destroy();
//   }
// }
