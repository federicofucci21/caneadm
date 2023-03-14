import { Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeekService } from '../week/week.service';
import { OutgoDTO, OutgoUpdateDTO } from './dto/outgo.dto';
import { OutgoEntity } from './entities/outgo.entity';

@Injectable()
export class OutgoService {
  constructor(
    @InjectRepository(OutgoEntity)
    private readonly outgoRepository: Repository<OutgoEntity>,
    private readonly weekService: WeekService,
  ) {}

  public async createOutgo(body: OutgoDTO): Promise<OutgoEntity | string> {
    try {
      const week = await this.weekService.findOpenWeek();
      if (!week) {
        return "We don't have an open week, please open one";
      }

      return await this.outgoRepository.save({
        ...body,
        date: new Date(),
        week,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findOutgoes(): Promise<OutgoEntity[] | string> {
    try {
      const outgoes: OutgoEntity[] = await this.outgoRepository.find();
      if (!outgoes.length) {
        return "We don't have any incomes on database";
      }

      return outgoes;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findOutgoById(id: number): Promise<OutgoEntity | string> {
    try {
      const outgo: OutgoEntity = await this.outgoRepository
        .createQueryBuilder('outgoes')
        .where({ id })
        .getOne();

      if (!outgo) {
        return `The id incomes number ${id} doesn't exist on database`;
      }

      return outgo;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateOutgo(
    id: number,
    body: OutgoUpdateDTO,
  ): Promise<OutgoEntity | string> {
    try {
      const outgo: UpdateResult = await this.outgoRepository.update(id, body);

      if (outgo.affected === 0) {
        return `The id incomes number ${id} doesn't exist on database`;
      }

      return await this.findOutgoById(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
