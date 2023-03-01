import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { orderProviders } from 'src/order/order.providers';
import { orderDetailProviders } from 'src/orderDetail/orderDetail.providers';
import { productProviders } from '../product/product.provider';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    ...userProviders,
    ...productProviders,
    ...orderProviders,
    ...orderDetailProviders,
  ],
  exports: [UserService],
})
export class UserModule {}
