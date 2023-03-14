import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { WeekService } from '../week/week.service';
import { IncomeDTO, IncomeUpdateDTO } from './dto/income.dto';
import { IncomeEntity } from './entities/income.entity';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(IncomeEntity)
    private readonly incomeRepository: Repository<IncomeEntity>,
    private readonly weekService: WeekService,
  ) {}

  public async createIncome(body: IncomeDTO): Promise<IncomeEntity | string> {
    try {
      const weekOpen = await this.weekService.findOpenWeek();
      if (!weekOpen) {
        return "We don't have an open week, please open one";
      }

      return await this.incomeRepository.save({
        ...body,
        date: new Date(),
        week: weekOpen,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findIncomes(): Promise<IncomeEntity[] | string> {
    try {
      const incomes: IncomeEntity[] = await this.incomeRepository.find();
      if (!incomes.length) {
        return "We don't have any incomes on database";
      }

      return incomes;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findIncomeById(id: number): Promise<IncomeEntity | string> {
    try {
      const income: IncomeEntity = await this.incomeRepository
        .createQueryBuilder('incomes')
        .where({ id })
        .getOne();

      if (!income) {
        return `The id incomes number ${id} doesn't exist on database`;
      }

      return income;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateIncome(
    id: number,
    body: IncomeUpdateDTO,
  ): Promise<IncomeEntity | string> {
    try {
      const income: UpdateResult = await this.incomeRepository.update(id, body);

      if (income.affected === 0) {
        return `The id incomes number ${id} doesn't exist on database`;
      }

      return await this.findIncomeById(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
