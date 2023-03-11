import { Controller } from '@nestjs/common';
import { OutgoService } from './outgo.service';
import { Post, Body, Get } from '@nestjs/common/decorators';

@Controller('outgo')
export class OutgoController {
  constructor(private readonly incomeService: OutgoService) {}

  @Post()
  public async createOutgo(@Body() body: any) {
    return await this.incomeService.createOutgo(body);
  }

  @Get()
  public async getAllOurgoes() {
    return await this.incomeService.findOutgoes();
  }
}
