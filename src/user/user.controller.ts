import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  getAllUsers() {
    return 'all users';
  }
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return `user with id: ${id}`;
  }
}
