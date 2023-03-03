import { Body, Controller, Get, Param } from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  public async getAllOrders(@Body() body: OrderDTO) {
    return 'aca estan todas' /*await this.orderService.create(body)*/;
  }

  @Get(':id')
  public async getOrderById(@Param('id') id: string) {
    return 'aca hay una' /*this.orderService.findOneById(Number(id))*/;
  }
}
