import { Module } from '@nestjs/common';
// import { SequelizeModule } from '@nestjs/sequelize';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { orderProviders } from './order.providers';
// import { Order } from './order.model';

@Module({
  // imports: [SequelizeModule.forFeature([Order])],
  imports: [],
  providers: [OrderService, ...orderProviders],
  controllers: [OrderController],
})
export class OrderModule {}
