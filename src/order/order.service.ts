import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderModel.findAll();
  }

  findOne(id: string): Promise<Order> {
    return this.orderModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const order = await this.findOne(id);
    await order.destroy();
  }
}
