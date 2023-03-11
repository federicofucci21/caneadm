import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OutgoDTO } from './dto/outgo.dto';
import { OutgoEntity } from './entities/outgo.entity';

@Injectable()
export class OutgoService {
  constructor(
    @InjectRepository(OutgoEntity)
    private readonly outgoRepository: Repository<OutgoEntity>,
  ) {}

  public async createOutgo(body: any): Promise<OutgoEntity> {
    try {
      const outgo: OutgoDTO = {
        amount: body.amount,
        detail: body.detail,
        date: new Date(),
      };
      return await this.outgoRepository.save(outgo);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findOutgoes(): Promise<OutgoEntity[]> {
    try {
      return await this.outgoRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }
}
