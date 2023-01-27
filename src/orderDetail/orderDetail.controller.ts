import { Controller, Get, Param } from '@nestjs/common';

@Controller('orderDetail')
export class OrderDetailController {
  @Get()
  getAllOrderDetails() {
    return 'all orders';
  }
  @Get(':id')
  getOrderDetailById(@Param('id') id: string) {
    return `order with id: ${id}`;
  }
}
