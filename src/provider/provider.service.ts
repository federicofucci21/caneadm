import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from '../helpers/error.manager';
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
      const provider = await this.providerRepository.save(body);
      if (!provider) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `provider not created`,
        });
      }
      return provider;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findProviders(): Promise<ProviderEntity[]> {
    try {
      const providers = await this.providerRepository.find();
      if (!providers) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `No providers on DataBase`,
        });
      }
      return providers;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOneByName(name: string): Promise<ProviderEntity> {
    try {
      const provider = await this.providerRepository
        .createQueryBuilder('providers')
        .where({ name })
        .getOne();
      if (!provider) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Product named: ${name}, do not exist`,
        });
      }
      return provider;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async getById(id: number): Promise<ProviderEntity> {
    try {
      const provider = await this.providerRepository
        .createQueryBuilder('providers')
        .where({ id })
        .leftJoinAndSelect('providers.expenses', 'expenses')
        .getOne();
      if (!provider) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `provider with ID: ${id} do not exist`,
        });
      }
      return provider;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateProvider(
    id: number,
    body: ProviderUpdateDTO,
  ): Promise<ProviderEntity> {
    try {
      const provider: UpdateResult = await this.providerRepository.update(
        id,
        body,
      );
      if (provider.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `The provider with identification ${id} doesn't found on database`,
        });
      }
      return await this.getById(id);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
