import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsForOrderEntity } from '../order/entities/productOrder.entity';
import { OrderEntity } from '../order/entities/order.entity';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { WeekEntity } from '../week/entities/week.entity';
import { WeekService } from '../week/week.service';
import { ProductEntity } from '../product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      OrderEntity,
      ProductsForOrderEntity,
      WeekEntity,
      ProductEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, WeekService],
  exports: [UserService],
})
export class UserModule {}
