import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { orderProviders } from './order.providers';

@Module({
  imports: [],
  providers: [OrderService, ...orderProviders],
  controllers: [OrderController],
})
export class OrderModule {}
