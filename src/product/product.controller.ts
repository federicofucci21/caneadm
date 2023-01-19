import { Controller, Get, Param } from '@nestjs/common';

@Controller('product')
export class ProductController {
  @Get()
  getAllProducts() {
    return 'all products';
  }
  @Get(':id')
  getProductrById(@Param('id') id: string) {
    return `product with id: ${id}`;
  }
}
