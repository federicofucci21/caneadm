import { Controller, Get, Param } from '@nestjs/common';

@Controller('product')
export class ProductController {
  @Get()
  getAllUsers() {
    return 'all products';
  }
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return `product with id: ${id}`;
  }
}
