import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncomeDTO } from './dto/income.dto';
import { IncomeEntity } from './entities/income.entity';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(IncomeEntity)
    private readonly incomeRepository: Repository<IncomeEntity>,
  ) {}

  public async createIncome(body: any): Promise<IncomeEntity> {
    try {
      const income: IncomeDTO = {
        amount: body.amount,
        detail: body.detail,
        date: new Date(),
      };
      return await this.incomeRepository.save(income);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findIncomes(): Promise<IncomeEntity[]> {
    try {
      return await this.incomeRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }
}
