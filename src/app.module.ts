import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UserModule } from './user/user.module';
// import { ProductModule } from './product/product.module';
// import { OrderModule } from './order/order.module';
// import { DatabaseModule } from './core/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),
//     DatabaseModule,
//     // SequelizeModule.forRoot({
//     //   dialect: 'mysql',
//     //   host: 'localhost',
//     //   port: 3306,
//     //   username: 'root',
//     //   password: 'mysql',
//     //   database: 'caneadm',
//     //   models: [User, Product, Order, OrderDetail],
//     //   autoLoadModels: true,
//     //   synchronize: true,
//     // }),
//     UserModule,
//     ProductModule,
//     OrderModule,
//     DatabaseModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    UserModule,
    // ProductModule,
    // OrderModule,
    // DatabaseModule,
  ],
})
export class AppModule {}
