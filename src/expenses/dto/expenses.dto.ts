import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { WeekEntity } from '../../week/entities/week.entity';
import { ProviderEntity } from '../../provider/entities/provider.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ExpensesDTO {
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

  @IsNotEmpty()
  @ApiProperty()
  provider: ProviderEntity;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  week: WeekEntity;
}

export class ExpensesUpdateDTO {
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
  @ApiProperty()
  provider: ProviderEntity;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  week: WeekEntity;
}
