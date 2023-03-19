import { Body, Controller, Get, Param, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OrderUpdateDTO, ProductsForOrderUpdateDTO } from './dto/order.dto';
import { OrderService } from './order.service';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  public async getAllOrders(@Res() res: Response) {
    return await this.orderService.allOrders(res);
  }

  @Get('id/:id')
  public async getOrderById(@Param('id') id: string, @Res() res: Response) {
    return await this.orderService.findOneById(Number(id), res);
  }

  @Put('id/:id')
  public async editOrder(
    @Param('id') id: string,
    @Body() body: Array<ProductsForOrderUpdateDTO>,
    @Res() res: Response,
  ) {
    return await this.orderService.updateOrder(Number(id), body, res);
  }

  @Put('id/:id/state')
  public async editStateOrder(
    @Param('id') id: string,
    @Body() body: OrderUpdateDTO,
    @Res() res: Response,
  ) {
    return await this.orderService.updateStateOrder(Number(id), body, res);
  }
}
