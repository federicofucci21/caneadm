import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { OrderUpdateDTO } from './dto/order.dto';
import { ProductsForOrderEntity } from './entities/productOrder.entity';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  public async getAllOrders() {
    return await this.orderService.allOrders();
  }

  @Get('id/:id')
  public async getOrderById(@Param('id') id: string) {
    return this.orderService.findOneById(Number(id));
  }

  @Put('id/:id')
  public async editOrder(
    @Param('id') id: string,
    @Body() body: Array<ProductsForOrderEntity>,
  ) {
    return this.orderService.updateOrder(Number(id), body);
  }

  @Put('id/:id/state')
  public async editStateOrder(
    @Param('id') id: string,
    @Body() body: OrderUpdateDTO,
  ) {
    return this.orderService.updateStateOrder(Number(id), body);
  }
}
