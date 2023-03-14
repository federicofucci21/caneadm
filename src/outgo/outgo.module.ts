import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeekEntity } from '../week/entities/week.entity';
import { WeekService } from '../week/week.service';
import { OutgoEntity } from './entities/outgo.entity';
import { OutgoController } from './outgo.controller';
import { OutgoService } from './outgo.service';

@Module({
  imports: [TypeOrmModule.forFeature([OutgoEntity, WeekEntity])],
  controllers: [OutgoController],
  providers: [OutgoService, WeekService],
})
export class OutgoModule {}
