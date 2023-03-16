import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { WeekEntity } from '../../week/entities/week.entity';
import { ProviderEntity } from '../../provider/entities/provider.entity';

export class ExpensesDTO {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  detail: string;

  @IsOptional()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  provider: ProviderEntity;

  @IsOptional()
  @IsNumber()
  week: WeekEntity;
}

export class ExpensesUpdateDTO {
  @IsOptional()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  detail: string;

  @IsOptional()
  @IsDate()
  date: Date;

  @IsOptional()
  provider: ProviderEntity;

  @IsOptional()
  @IsNumber()
  week: WeekEntity;
}
