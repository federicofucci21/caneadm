import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { ProviderModule } from './provider/provider.module';
import { ExpensesModule } from './expenses/expenses.module';
import { IncomeModule } from './income/income.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    UserModule,
    ProductModule,
    OrderModule,
    ProviderModule,
    ExpensesModule,
    IncomeModule,
  ],
})
export class AppModule {}
