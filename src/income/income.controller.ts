import { Controller } from '@nestjs/common';
import { IncomeService } from './income.service';
import { Post, Body, Get } from '@nestjs/common/decorators';
// import { IncomeDTO } from './dto/income.dto';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  public async createUser(@Body() body: any) {
    return await this.incomeService.createIncome(body);
  }

  @Get()
  public async getAllIncomes() {
    return await this.incomeService.findIncomes();
  }
}
