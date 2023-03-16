import { ProductDTO, ProductUpdateDTO } from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository, UpdateResult } from 'typeorm';

export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public async createProduct(body: ProductDTO): Promise<ProductEntity> {
    try {
      return await this.productRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findAll(): Promise<ProductEntity[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findOneById(id: number): Promise<ProductEntity> {
    try {
      return await this.productRepository
        .createQueryBuilder('products')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async deleteProduct(id: number): Promise<ProductEntity | string> {
    try {
      const product: UpdateResult = await this.productRepository.update(id, {
        isActive: false,
      });
      if (product.affected === 0) {
        return `The product with identification ${id} doesn't found on database`;
      }
      return await this.findOneById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateProduct(
    id: number,
    body: ProductUpdateDTO,
  ): Promise<ProductEntity | string> {
    try {
      const product: UpdateResult = await this.productRepository.update(
        id,
        body,
      );
      if (product.affected === 0) {
        return `The product with identification ${id} doesn't found on database`;
      }
      return await this.findOneById(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
