import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductDTO, ProductUpdateDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public async getAllProducts() {
    return await this.productService.findAll();
  }

  @Get(':id')
  async getProductrById(@Param('id') id: string) {
    return await this.productService.findOneById(Number(id));
  }

  @Post()
  public async createProduct(@Body() body: ProductDTO) {
    return await this.productService.createProduct(body);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(Number(id));
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() product: ProductUpdateDTO,
  ) {
    return await this.productService.updateProduct(Number(id), product);
  }
}
