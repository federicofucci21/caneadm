import { Controller } from '@nestjs/common';
import { Body, Get, Param, Post } from '@nestjs/common/decorators';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post('create/:id')
  public async createExpenses(@Param('id') id: string, @Body() body: any) {
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

  @Get('id/:id/provider')
  public async getAllUserOrders(@Param('id') id: string) {
    return this.expensesService.findProvidersExpenses(Number(id));
  }
}
