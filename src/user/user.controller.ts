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
import { ProductsForOrderEntity } from '../order/entities/productOrder.entity';
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

  @Post('id/:id/order')
  public async orderCreate(
    @Param('id') id: string,
    @Body() body: ProductsForOrderEntity[],
  ) {
    return await this.userService.orderCreate(Number(id), body);
  }

  @Get('id/:id/order')
  public async getAllUserOrders(@Param('id') id: string) {
    return await this.userService.allUserOrders(Number(id));
  }
}
