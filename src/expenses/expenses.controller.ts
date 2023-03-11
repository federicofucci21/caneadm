import { Controller } from '@nestjs/common';
import { Body, Param, Post } from '@nestjs/common/decorators';
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
}
