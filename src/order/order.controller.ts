import { Controller, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  public async getAllOrders() {
    return await this.orderService.allOrders();
  }

  @Get(':id')
  public async getOrderById(@Param('id') id: string) {
    return this.orderService.findOneById(Number(id));
  }
}
