import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { WeekEntity } from '../../week/entities/week.entity';

export class IncomeDTO {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  detail: string;

  @IsOptional()
  @IsDate()
  date: Date;

  @IsOptional()
  @IsNumber()
  week: WeekEntity;
}

export class IncomeUpdateDTO {
  @IsOptional()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  detail: string;

  @IsOptional()
  @IsDate()
  date: Date;
}
