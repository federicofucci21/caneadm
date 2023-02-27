import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getAllUsers() {
    return await this.userService.findUsers();
  }

  @Post()
  public async createUser(@Body() body: UserDTO) {
    return await this.userService.createUser(body);
  }
}
