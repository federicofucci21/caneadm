import { Controller } from '@nestjs/common';
import { Body, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { ExpensesDTO, ExpensesUpdateDTO } from './dto/expenses.dto';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  public async createExpenses(@Body() body: ExpensesDTO) {
    return this.expensesService.createExpenses(body);
  }

  @Get()
  public async getAllProviders() {
    return await this.expensesService.findExpenses();
  }

  @Get('id/:id')
  public async getExpensesById(@Param('id') id: string) {
    return await this.expensesService.findOneById(Number(id));
  }

  @Put('id/:id')
  public async editExpense(
    @Param('id') id: string,
    @Body() body: ExpensesUpdateDTO,
  ) {
    return await this.expensesService.updateExpenses(Number(id), body);
  }

  @Get('id/:id/provider')
  public async getAllUserOrders(@Param('id') id: string) {
    return this.expensesService.findProvidersExpenses(Number(id));
  }
}
