import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ProviderDTO, ProviderUpdateDTO } from './dto/provider.dto';
import { ProviderEntity } from './entities/provider.entity';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(ProviderEntity)
    private readonly providerRepository: Repository<ProviderEntity>,
  ) {}

  public async createProvider(body: ProviderDTO): Promise<ProviderEntity> {
    try {
      return await this.providerRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findProviders(): Promise<ProviderEntity[]> {
    try {
      return await this.providerRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getById(id: number): Promise<ProviderEntity> {
    try {
      return await this.providerRepository
        .createQueryBuilder('providers')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateProvider(
    id: number,
    body: ProviderUpdateDTO,
  ): Promise<UpdateResult | undefined> {
    try {
      const provider: UpdateResult = await this.providerRepository.update(
        id,
        body,
      );
      if (provider.affected === 0) {
        return undefined;
      }
      return provider;
    } catch (error) {
      throw new Error(error);
    }
  }
}
