import { Module } from '@nestjs/common';
// import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
// import { User } from './user.model';
import { UserService } from './user.service';

@Module({
  // imports: [SequelizeModule.forFeature([User])],
  imports: [],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
  exports: [UserService],
})
export class UserModule {}
