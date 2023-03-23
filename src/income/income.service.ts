import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from '../helpers/error.manager';
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

  public async createIncome(body: IncomeDTO): Promise<IncomeEntity> {
    try {
      const weekOpen = await this.weekService.findOpenWeek();
      if (!weekOpen) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `There aren't open week, please open one`,
        });
      }

      const income = await this.incomeRepository.save({
        ...body,
        date: new Date(),
        week: weekOpen,
      });
      if (!income) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `income not created`,
        });
      }
      return income;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findIncomes(): Promise<IncomeEntity[]> {
    try {
      const incomes: IncomeEntity[] = await this.incomeRepository.find();
      if (!incomes) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `No incomes on DataBase`,
        });
      }

      return incomes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findIncomeById(id: number): Promise<IncomeEntity> {
    try {
      const income: IncomeEntity = await this.incomeRepository
        .createQueryBuilder('incomes')
        .where({ id })
        .getOne();

      if (!income) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `income with ID: ${id} do not exist`,
        });
      }
      return income;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateIncome(
    id: number,
    body: IncomeUpdateDTO,
  ): Promise<IncomeEntity | string> {
    try {
      const income: UpdateResult = await this.incomeRepository.update(id, body);

      if (income.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `The income with identification ${id} doesn't found on database`,
        });
      }

      return await this.findIncomeById(id);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
