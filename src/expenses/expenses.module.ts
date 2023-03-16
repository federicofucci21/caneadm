import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderService } from '../provider/provider.service';
import { ProviderEntity } from '../provider/entities/provider.entity';
import { WeekEntity } from '../week/entities/week.entity';
import { WeekService } from '../week/week.service';
import { ExpensesEntity } from './entities/expenses.entity';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpensesEntity, WeekEntity, ProviderEntity]),
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService, WeekService, ProviderService],
})
export class ExpensesModule {}
