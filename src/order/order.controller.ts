import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderUpdateDTO, ProductsForOrderUpdateDTO } from './dto/order.dto';
import { OrderService } from './order.service';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  public async getAllOrders() {
    return await this.orderService.allOrders();
  }

  @Get('id/:id')
  public async getOrderById(@Param('id') id: string) {
    return await this.orderService.findOneById(Number(id));
  }

  @Put('id/:id')
  public async editOrder(
    @Param('id') id: string,
    @Body() body: Array<ProductsForOrderUpdateDTO>,
  ) {
    return await this.orderService.updateOrder(Number(id), body);
  }

  @Put('id/:id/state')
  public async editStateOrder(
    @Param('id') id: string,
    @Body() body: OrderUpdateDTO,
  ) {
    return await this.orderService.updateStateOrder(Number(id), body);
  }
}
