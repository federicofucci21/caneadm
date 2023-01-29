import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderDetail } from '../orderDetail/orderDetail.model';
import { UserDto } from './dto/user.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUsers() {
    console.log('RES', await this.userService.findAll());
    return await this.userService.findAll();
  }
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.getById(Number(id));
  }

  @Post()
  async createUser(@Body() user: UserDto): Promise<User> {
    return await this.userService.createUser(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.userService.deleteUser(id);
  }

  @Post(':id/cart')
  cartCreate2(
    @Param('id') userId: number,
    @Body() product: number,
  ): Promise<OrderDetail> {
    return this.userService.cartCreate(userId, product);
  }

  @Put(':id/cart')
  async cartUpdate2(
    @Param('id') userId: number,
    @Body() product: number,
  ): Promise<any> {
    return await this.userService.cartUpdate(userId, product);
  }

  @Delete(':id/cart')
  async deleteOrder2(@Param('id') id: number): Promise<any> {
    return await this.userService.deleteOrder(id);
  }

  @Get(':id/cart')
  async getAllItems2(@Param('id') id: number): Promise<object> {
    return await this.userService.getAllItems(id);
  }

  @Delete(':id/cart/:productId')
  async delteItem2(@Param('productId') productId, @Body() orderId) {
    return await this.userService.deleteItem(orderId, productId);
  }
}
