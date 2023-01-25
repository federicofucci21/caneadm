import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async getAllProducts() {
    return await this.productService.findAll();
  }
  @Get(':id')
  async getProductrById(@Param('id') id: string) {
    return await this.productService.findOneById(Number(id));
  }

  @Post()
  async createProduct(@Body() product: ProductDto): Promise<Product> {
    // create a new user and return the newly created user
    return await this.productService.createProduct(product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<Product> {
    return await this.productService.deleteProduct(id);
  }
}
