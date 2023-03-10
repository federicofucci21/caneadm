import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { orderProviders } from './order.providers';
import { OrderEntity } from './entities/order.entity';
import { ProductsForOrderEntity } from './entities/productOrder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, ProductsForOrderEntity])],
  providers: [OrderService, ...orderProviders],
  controllers: [OrderController],
})
export class OrderModule {}
