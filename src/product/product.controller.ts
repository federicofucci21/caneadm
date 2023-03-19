import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ProductDTO, ProductUpdateDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public async getAllProducts(@Res() res: Response) {
    return await this.productService.findAll(res);
  }

  @Get(':id')
  async getProductrById(@Param('id') id: string, @Res() res: Response) {
    return await this.productService.findOneById(Number(id), res);
  }

  @Post()
  public async createProduct(@Body() body: ProductDTO, @Res() res: Response) {
    return await this.productService.createProduct(body, res);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string, @Res() res: Response) {
    return await this.productService.deleteProduct(Number(id), res);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() product: ProductUpdateDTO,
    @Res() res: Response,
  ) {
    return await this.productService.updateProduct(Number(id), product, res);
  }
}
