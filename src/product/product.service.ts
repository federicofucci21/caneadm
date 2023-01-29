import { Injectable, Inject } from '@nestjs/common';
import { Product } from './product.model';
import { ProductDto } from './dto/product.dto';
import { PRODUCT_REPOSITORY } from '../core/constants';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
  ) {}

  async createProduct(product: ProductDto): Promise<Product> {
    return await this.productRepository.create<Product>(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async findOneById(id: number): Promise<Product> {
    return await this.productRepository.findByPk<Product>(id);
  }

  async deleteProduct(id: string): Promise<Product> {
    const product = await this.productRepository.findByPk<Product>(id);
    if (product.isActive) {
      return await product.update({
        isActive: false,
      });
    }
    return await product.update({
      isActive: true,
    });
  }
}
