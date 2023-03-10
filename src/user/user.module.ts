import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsForOrderEntity } from '../order/entities/productOrder.entity';
import { OrderEntity } from '../order/entities/order.entity';
import { orderProviders } from '../order/order.providers';
import { productProviders } from '../product/product.provider';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, OrderEntity, ProductsForOrderEntity]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ...userProviders,
    ...productProviders,
    ...orderProviders,
  ],
  exports: [UserService],
})
export class UserModule {}
