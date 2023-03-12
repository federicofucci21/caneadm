import { InjectRepository } from '@nestjs/typeorm';
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
      return await this.weekRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getWeekById(id: number): Promise<WeekEntity | string> {
    try {
      const week = await this.weekRepository
        .createQueryBuilder('weeks')
        .where({ id })
        .leftJoinAndSelect('weeks.order', 'order')
        .getOne();

      return week
        ? week
        : `We don't have a week with identification ${id} on our database`;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findOpenWeek(): Promise<WeekEntity> {
    try {
      return await this.weekRepository
        .createQueryBuilder('weeks')
        .where({ status: WEEKSTATE.OPEN })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async weekCreate(body: WeekDTO): Promise<WeekEntity | string> {
    try {
      const week = await this.weekRepository
        .createQueryBuilder('weeks')
        .where({ status: WEEKSTATE.OPEN })
        .getOne();

      if (week) {
        return 'You have an open week, please close it';
      }

      return this.weekRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateWeek(
    id: number,
    body: WeekUpdateDTO,
  ): Promise<UpdateResult | string> {
    try {
      const week: UpdateResult = await this.weekRepository.update(id, body);

      if (week.affected === 0) {
        return "Week doesn't found";
      }

      return week;
    } catch (error) {
      throw new Error(error);
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
