import { Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeekService } from '../week/week.service';
import { OutgoDTO, OutgoUpdateDTO } from './dto/outgo.dto';
import { OutgoEntity } from './entities/outgo.entity';
import { ErrorManager } from '../helpers/error.manager';

@Injectable()
export class OutgoService {
  constructor(
    @InjectRepository(OutgoEntity)
    private readonly outgoRepository: Repository<OutgoEntity>,
    private readonly weekService: WeekService,
  ) {}

  public async createOutgo(body: OutgoDTO): Promise<OutgoEntity> {
    try {
      const week = await this.weekService.findOpenWeek();
      if (!week) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `There aren't open week, please open one`,
        });
      }

      const outgo = await this.outgoRepository.save({
        ...body,
        date: new Date(),
        week,
      });
      if (!outgo) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `outgo not created`,
        });
      }
      return outgo;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOutgoes(): Promise<OutgoEntity[]> {
    try {
      const outgoes: OutgoEntity[] = await this.outgoRepository.find();
      if (!outgoes) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `No outgoes on DataBase`,
        });
      }

      return outgoes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOutgoById(id: number): Promise<OutgoEntity> {
    try {
      const outgo: OutgoEntity = await this.outgoRepository
        .createQueryBuilder('outgoes')
        .where({ id })
        .getOne();

      if (!outgo) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `outgo with ID: ${id} do not exist`,
        });
      }
      return outgo;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateOutgo(
    id: number,
    body: OutgoUpdateDTO,
  ): Promise<OutgoEntity | string> {
    try {
      const outgo: UpdateResult = await this.outgoRepository.update(id, body);

      if (outgo.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `The outgo with identification ${id} doesn't found on database`,
        });
      }

      return await this.findOutgoById(id);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
