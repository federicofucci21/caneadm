import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from '../helpers/error.manager';
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

  public async createExpenses(body: ExpensesDTO): Promise<ExpensesEntity> {
    try {
      const week = await this.weekService.findOpenWeek();
      if (!week) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `There aren't open week, please open one`,
        });
      }

      const provider = await this.providerService.getById(body.provider.id);

      if (!provider) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `provider with ID: ${body.provider.id} do not exist`,
        });
      }

      const expenses: ExpensesDTO = {
        ...body,
        date: new Date(),
        provider,
        week,
      };
      const expensesCreate = await this.expensesRepository.save(expenses);
      if (!expensesCreate) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `Expenses not created`,
        });
      }
      return expensesCreate;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async findExpenses(): Promise<ExpensesEntity[]> {
    try {
      const expenses = await this.expensesRepository.find();
      if (!expenses) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `No expenses on DataBase`,
        });
      }
      return expenses;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOneById(id: number): Promise<ExpensesEntity> {
    try {
      const expenses = await this.expensesRepository
        .createQueryBuilder('expenses')
        .where({ id })
        .leftJoinAndSelect('expenses.provider', 'provider')
        .getOne();
      if (!expenses) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `expenses with ID: ${id} do not exist`,
        });
      }
      return expenses;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findProvidersExpenses(id: number): Promise<ExpensesEntity[]> {
    try {
      const providerExpenses = await this.expensesRepository
        .createQueryBuilder('expenses')
        .where({ provider: id })
        .getMany();
      if (!providerExpenses) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `provider with ID: ${id} do not have related expenses`,
        });
      }
      return providerExpenses;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
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
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `The expense with identification ${id} doesn't found on database`,
        });
      }
      return await this.findOneById(id);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
