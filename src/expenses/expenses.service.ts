import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpensesDTO } from './dto/expenses.dto';
import { ExpensesEntity } from './entities/expenses.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(ExpensesEntity)
    private readonly expensesRepository: Repository<ExpensesEntity>,
  ) {}

  public async createExpenses(
    body: ExpensesDTO,
    providerId: any,
  ): Promise<ExpensesEntity> {
    try {
      console.log('BODY', body);
      console.log('providerId', providerId);
      const expenses: ExpensesDTO = {
        amount: body.amount,
        detail: body.detail,
        date: new Date(),
        provider: providerId,
      };
      console.log('expenses', expenses);
      return await this.expensesRepository.save(expenses);
    } catch (error) {
      throw new Error(error);
    }
  }
  public async findExpenses(): Promise<ExpensesEntity[]> {
    try {
      return await this.expensesRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findOneById(id: number): Promise<ExpensesEntity> {
    try {
      return await this.expensesRepository
        .createQueryBuilder('expenses')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }
}
