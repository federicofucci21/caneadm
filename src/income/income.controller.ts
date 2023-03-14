import { Controller } from '@nestjs/common';
import { Post, Body, Get, Param, Put } from '@nestjs/common/decorators';
import { IncomeUpdateDTO } from './dto/income.dto';
import { IncomeService } from './income.service';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Get()
  public async getAllIncomes() {
    return await this.incomeService.findIncomes();
  }

  @Get('id/:id')
  public async getIncomeByPk(@Param('id') id: string) {
    return await this.incomeService.findIncomeById(Number(id));
  }

  @Post()
  public async createIncome(@Body() body: any) {
    return await this.incomeService.createIncome(body);
  }

  @Put('id/:id')
  public async editIncome(
    @Param('id') id: string,
    @Body() body: IncomeUpdateDTO,
  ) {
    return await this.incomeService.updateIncome(Number(id), body);
  }
}
