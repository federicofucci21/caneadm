import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ProviderService } from '../provider/provider.service';
import { WeekService } from '../week/week.service';
import { ExpensesDTO, ExpensesUpdateDTO } from './dto/expenses.dto';
import { ExpensesEntity } from './entities/expenses.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(ExpensesEntity)
    private readonly expensesRepository: Repository<ExpensesEntity>,
    private readonly weekService: WeekService,
    private readonly providerService: ProviderService,
  ) {}

  public async createExpenses(
    body: ExpensesDTO,
  ): Promise<ExpensesEntity | string> {
    try {
      const week = await this.weekService.findOpenWeek();
      if (!week) {
        return "We don't have an open week, please open one";
      }

      const provider = await this.providerService.getById(body.provider.id);

      if (!provider) {
        return "We don't have a provider with than id on database";
      }

      const expenses: ExpensesDTO = {
        ...body,
        date: new Date(),
        provider,
        week,
      };
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
        .leftJoinAndSelect('expenses.provider', 'provider')
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findProvidersExpenses(id: number): Promise<ExpensesEntity[]> {
    try {
      return await this.expensesRepository
        .createQueryBuilder('expenses')
        .where({ provider: id })
        .getMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateExpenses(
    id: number,
    body: ExpensesUpdateDTO,
  ): Promise<ExpensesEntity | string> {
    try {
      const expenses: UpdateResult = await this.expensesRepository.update(
        id,
        body,
      );
      if (expenses.affected === 0) {
        return `The expense with identification ${id} doesn't found on database`;
      }
      return await this.findOneById(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
