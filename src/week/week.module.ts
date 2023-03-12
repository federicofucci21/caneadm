import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeekEntity } from './entities/week.entity';
import { WeekController } from './week.controller';
import { WeekService } from './week.service';

@Module({
  imports: [TypeOrmModule.forFeature([WeekEntity])],
  controllers: [WeekController],
  providers: [WeekService],
})
export class WeekModule {}
