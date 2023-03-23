import { ProductDTO, ProductUpdateDTO } from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from '../helpers/error.manager';

export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public async createProduct(body: ProductDTO): Promise<ProductEntity> {
    try {
      const product = await this.productRepository.save(body);
      if (!product) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `product not created`,
        });
      }
      return product;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAll(): Promise<ProductEntity[]> {
    try {
      const products = await this.productRepository.find();
      if (!products) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `No products on DataBase`,
        });
      }
      return products;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOneById(id: number): Promise<ProductEntity> {
    try {
      const product = await this.productRepository
        .createQueryBuilder('products')
        .where({ id })
        .getOne();
      if (!product) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Product with ID: ${id} do not exist`,
        });
      }
      return product;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteProduct(id: number): Promise<ProductEntity> {
    try {
      const product: UpdateResult = await this.productRepository.update(id, {
        isActive: false,
      });
      if (product.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Product with identification ${id} doesn't found on database`,
        });
      }
      return await this.findOneById(id);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateProduct(
    id: number,
    body: ProductUpdateDTO,
  ): Promise<ProductEntity> {
    try {
      const product: UpdateResult = await this.productRepository.update(
        id,
        body,
      );
      if (product.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Product with identification ${id} doesn't found on database`,
        });
      }
      return await this.findOneById(id);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
