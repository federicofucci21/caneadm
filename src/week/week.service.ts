import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from '../helpers/error.manager';
import { Repository, UpdateResult } from 'typeorm';
import { WEEKSTATE } from '../constants/weekState';
import { WeekDTO, WeekUpdateDTO } from './dto/week.dto';
import { WeekEntity } from './entities/week.entity';

export class WeekService {
  constructor(
    @InjectRepository(WeekEntity)
    private readonly weekRepository: Repository<WeekEntity>,
  ) {}

  public async allWeeks(): Promise<WeekEntity[]> {
    try {
      const weeks = await this.weekRepository.find();
      if (!weeks) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `No weeks on DataBase`,
        });
      }
      return weeks;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async getWeekById(id: number): Promise<WeekEntity> {
    try {
      const week = await this.weekRepository
        .createQueryBuilder('weeks')
        .where({ id })
        .leftJoinAndSelect('weeks.order', 'order')
        .leftJoinAndSelect('weeks.income', 'income')
        .leftJoinAndSelect('weeks.outgo', 'outgo')
        .leftJoinAndSelect('weeks.expenses', 'expenses')
        .getOne();
      if (!week) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Week with ID: ${id} do not exist`,
        });
      }
      return week;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOpenWeek(): Promise<WeekEntity> {
    try {
      const openWeek = await this.weekRepository
        .createQueryBuilder('weeks')
        .where({ status: WEEKSTATE.OPEN })
        .getOne();
      if (!openWeek) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `There aren't open week, please open one`,
        });
      }
      return openWeek;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async weekCreate(body: WeekDTO): Promise<WeekEntity> {
    try {
      const week = await this.weekRepository
        .createQueryBuilder('weeks')
        .where({ status: WEEKSTATE.OPEN })
        .getOne();

      if (week) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'You have an open week, please close it',
        });
      }

      const newWeek = this.weekRepository.save({
        ...body,
        open: new Date(),
        close: '',
      });
      if (!newWeek) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `week not created`,
        });
      }
      return newWeek;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async closeWeek(id: number): Promise<WeekEntity> {
    try {
      const week: UpdateResult = await this.weekRepository.update(id, {
        close: new Date(),
        status: WEEKSTATE.CLOSE,
      });

      if (week.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Week with ID: ${id} doesn't found on database`,
        });
      }
      return await this.getWeekById(id);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateWeek(
    id: number,
    body: WeekUpdateDTO,
  ): Promise<WeekEntity> {
    try {
      const week: UpdateResult = await this.weekRepository.update(id, body);

      if (week.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Week with ID: ${id} doesn't found on database`,
        });
      }
      return await this.getWeekById(id);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteWeek(id) {
    try {
      return await this.weekRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
