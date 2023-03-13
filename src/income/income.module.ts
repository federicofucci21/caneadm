import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeekEntity } from '../week/entities/week.entity';
import { WeekService } from '../week/week.service';
import { IncomeEntity } from './entities/income.entity';
import { IncomeController } from './income.controller';
import { IncomeService } from './income.service';

@Module({
  imports: [TypeOrmModule.forFeature([IncomeEntity, WeekEntity])],
  controllers: [IncomeController],
  providers: [IncomeService, WeekService],
})
export class IncomeModule {}
