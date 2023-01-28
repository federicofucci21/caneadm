import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getById(Number(id));
  }

  @Post()
  async createUser(@Body() user: UserDto): Promise<User> {
    // create a new user and return the newly created user
    return await this.userService.createUser(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.userService.deleteUser(id);
  }

  @Post(':id/cart')
  cartCreate2(@Param('id') userId: number, @Body() product: number): string {
    return this.userService.cartCreate(userId, product);
  }
}
