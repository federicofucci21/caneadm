import { Module } from '@nestjs/common';
// import { SequelizeModule } from '@nestjs/sequelize';
import { ProductController } from './product.controller';
import { productProviders } from './product.provider';
// import { Product } from './product.model';
import { ProductService } from './product.service';

@Module({
  // imports: [SequelizeModule.forFeature([Product])],
  imports: [],
  controllers: [ProductController],
  providers: [ProductService, ...productProviders],
  exports: [ProductService],
})
export class ProductModule {}
