import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { User } from './user/user.model';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
// import { Product } from './product/product.model';
// import { Order } from './order/order.model';
// import { OrderDetail } from './orderDetail/orderDetail.model';
import { DatabaseModule } from './core/database/database.module';
import { OrderDetailModule } from './orderDetail/orderDetail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    // SequelizeModule.forRoot({
    //   dialect: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'mysql',
    //   database: 'caneadm',
    //   models: [User, Product, Order, OrderDetail],
    //   autoLoadModels: true,
    //   synchronize: true,
    // }),
    UserModule,
    ProductModule,
    OrderModule,
    OrderDetailModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
