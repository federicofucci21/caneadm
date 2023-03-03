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

  public async deleteProduct(id: number): Promise<UpdateResult | undefined> {
    try {
      const product: UpdateResult = await this.productRepository.update(id, {
        isActive: false,
      });
      if (product.affected === 0) {
        return undefined;
      }
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateProduct(
    id: string,
    body: ProductUpdateDTO,
  ): Promise<UpdateResult | undefined> {
    try {
      const product: UpdateResult = await this.productRepository.update(
        id,
        body,
      );
      if (product.affected === 0) {
        return undefined;
      }
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }
}
