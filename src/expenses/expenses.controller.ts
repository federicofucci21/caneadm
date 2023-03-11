import { Controller } from '@nestjs/common';
import { Body, Get, Param, Post } from '@nestjs/common/decorators';
// import { ExpensesEntity } from './entities/expenses.entity';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post('create/:id')
  public async createExpenses(@Param('id') id: string, @Body() body: any) {
    console.log('BODY', body);
    console.log('ID', id);
    return this.expensesService.createExpenses(body, Number(id));
  }

  @Get()
  public async getAllProviders() {
    return await this.expensesService.findExpenses();
  }

  @Get('id/:id')
  public async getExpensesById(@Param('id') id: string) {
    return await this.expensesService.findOneById(Number(id));
  }
}
