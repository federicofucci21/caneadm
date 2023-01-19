import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  findOne(id: string): Promise<Product> {
    return this.productModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await product.destroy();
  }
}
