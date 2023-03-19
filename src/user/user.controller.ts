import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ProductsForOrderDTO } from '../order/dto/order.dto';
import { UserDTO, UserUpdateDTO } from './dto/user.dto';
import { UserService } from './user.service';
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getAllUsers(@Res() res: Response) {
    return await this.userService.findUsers(res);
  }

  @Get('id/:id')
  public async getUserById(@Param('id') id: string, @Res() res: Response) {
    return await this.userService.getById(Number(id), res);
  }

  @Get('email')
  public async getUserByEmail(@Query('e') email: string) {
    return await this.userService.findOneByEmail(email);
  }

  @Get('cell')
  public async getUserByCell(@Query('c') cell: string, @Res() res: Response) {
    return await this.userService.findOneByCell(cell, res);
  }

  @Post()
  public async createUser(@Body() body: UserDTO, @Res() res: Response) {
    return await this.userService.createUser(body, res);
  }

  @Put('id/:id')
  public async editUser(
    @Param('id') id: string,
    @Body() body: UserUpdateDTO,
    @Res() res: Response,
  ) {
    return await this.userService.updateUser(Number(id), body, res);
  }

  @Delete('id/:id')
  public async deleteUser(@Param('id') id: string, @Res() res: Response) {
    return await this.userService.deleteUser(Number(id), res);
  }

  @Post('id/:id/order')
  public async orderCreate(
    @Param('id') id: string,
    @Body() body: Array<ProductsForOrderDTO>,
    @Res() res: Response,
  ) {
    return await this.userService.orderCreate(Number(id), body, res);
  }

  @Get('id/:id/order')
  public async getAllUserOrders(@Param('id') id: string, @Res() res: Response) {
    return await this.userService.allUserOrders(Number(id), res);
  }
}
