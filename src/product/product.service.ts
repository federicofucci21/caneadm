import { Injectable, Inject } from '@nestjs/common';
import { Product } from './product.model';
import { ProductDto } from './dto/product.dto';
import { PRODUCT_REPOSITORY } from 'src/core/constants';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
  ) {}

  async create(product: ProductDto): Promise<Product> {
    return await this.productRepository.create<Product>(product);
  }

  async findOneById(id: number): Promise<Product> {
    return await this.productRepository.findOne<Product>({ where: { id } });
  }
}
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { Product } from './product.model';

// @Injectable()
// export class ProductService {
//   constructor(
//     @InjectModel(Product)
//     private productModel: typeof Product,
//   ) {}

//   async findAll(): Promise<Product[]> {
//     return this.productModel.findAll();
//   }

//   findOne(id: string): Promise<Product> {
//     return this.productModel.findOne({
//       where: {
//         id,
//       },
//     });
//   }

//   async remove(id: string): Promise<void> {
//     const product = await this.findOne(id);
//     await product.destroy();
//   }
// }
