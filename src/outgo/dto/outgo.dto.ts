import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { WeekEntity } from '../../week/entities/week.entity';

export class OutgoDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  amount: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  detail: string;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  date: Date;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  week: WeekEntity;
}

export class OutgoUpdateDTO {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  amount: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  detail: string;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  date: Date;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  week: WeekEntity;
}
