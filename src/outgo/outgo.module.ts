import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutgoEntity } from './entities/outgo.entity';
import { OutgoController } from './outgo.controller';
import { OutgoService } from './outgo.service';

@Module({
  imports: [TypeOrmModule.forFeature([OutgoEntity])],
  controllers: [OutgoController],
  providers: [OutgoService],
})
export class OutgoModule {}
