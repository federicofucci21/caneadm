import { Controller, Get, Param } from '@nestjs/common';

@Controller('order')
export class OrderController {
  @Get()
  getAllOrders() {
    return 'all orders';
  }
  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return `order with id: ${id}`;
  }
}
