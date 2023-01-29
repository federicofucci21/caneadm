import { Module } from '@nestjs/common';
import { orderProviders } from 'src/order/order.providers';
import { orderDetailProviders } from 'src/orderDetail/orderDetail.providers';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    ...userProviders,
    ...orderProviders,
    ...orderDetailProviders,
  ],
  exports: [UserService],
})
export class UserModule {}
