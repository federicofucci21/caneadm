import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
// import { OrderDetail } from '../orderDetail/orderDetail.model';
import { UserDTO, UserUpdateDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getAllUsers() {
    return await this.userService.findUsers();
  }

  @Get('id/:id')
  public async getUserById(@Param('id') id: string) {
    return await this.userService.getById(Number(id));
  }

  @Get('email')
  public async getUserByEmail(@Query('e') email: string) {
    return await this.userService.findOneByEmail(email);
  }

  @Post()
  public async createUser(@Body() body: UserDTO) {
    return await this.userService.createUser(body);
  }

  @Put('id/:id')
  public async editUser(@Param('id') id: string, @Body() body: UserUpdateDTO) {
    return await this.userService.updateUser(Number(id), body);
  }

  @Delete('id/:id')
  public async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(Number(id));
  }

  // @Post(':id/cart')
  // cartCreate2(
  //   @Param('id') userId: number,
  //   @Body() product: number,
  // ): Promise<OrderDetail> {
  //   return this.userService.cartCreate(userId, product);
  // }

  // @Put(':id/cart')
  // async cartUpdate2(
  //   @Param('id') userId: number,
  //   @Body() product: number,
  // ): Promise<any> {
  //   return await this.userService.cartUpdate(userId, product);
  // }

  // @Delete(':id/cart')
  // async deleteOrder2(@Param('id') id: number): Promise<any> {
  //   return await this.userService.deleteOrder(id);
  // }

  // @Get(':id/cart')
  // async getAllItems2(@Param('id') id: number): Promise<object> {
  //   return await this.userService.getAllItems(id);
  // }

  // @Delete(':id/cart/:productId')
  // async delteItem2(@Param('productId') productId, @Body() orderId) {
  //   return await this.userService.deleteItem(orderId, productId);
  // }
}
