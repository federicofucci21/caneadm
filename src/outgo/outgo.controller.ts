import { Controller } from '@nestjs/common';
import { Post, Body, Get, Put, Param } from '@nestjs/common/decorators';
import { OutgoUpdateDTO } from './dto/outgo.dto';
import { OutgoService } from './outgo.service';

@Controller('outgo')
export class OutgoController {
  constructor(private readonly outgoService: OutgoService) {}

  @Get()
  public async getAllOurgoes() {
    return await this.outgoService.findOutgoes();
  }

  @Get('id/:id')
  public async getIncomeByPk(@Param('id') id: string) {
    return await this.outgoService.findOutgoById(Number(id));
  }

  @Post()
  public async createOutgo(@Body() body: any) {
    return await this.outgoService.createOutgo(body);
  }

  @Put('id/:id')
  public async editIncome(
    @Param('id') id: string,
    @Body() body: OutgoUpdateDTO,
  ) {
    return await this.outgoService.updateOutgo(Number(id), body);
  }
}
