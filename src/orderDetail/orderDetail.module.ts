import { Module } from '@nestjs/common';
import { OrderDetailController } from './orderDetail.controller';
import { orderDetailProviders } from './orderDetail.providers';
import { OrderDetailService } from './orderDetail.service';
// import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  // imports: [SequelizeModule.forFeature([OrderDetail])],
  imports: [],
  providers: [OrderDetailService, ...orderDetailProviders],
  controllers: [OrderDetailController],
})
export class OrderDetailModule {}
