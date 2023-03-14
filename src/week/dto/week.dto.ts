import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { WEEKSTATE } from '../../constants/weekState';

export class WeekDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  detail: string;

  @IsOptional()
  @IsDate()
  open: Date;

  @IsOptional()
  @IsDate()
  close: Date;

  @IsOptional()
  @IsEnum(WEEKSTATE)
  status: WEEKSTATE;
}

export class WeekUpdateDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  detail: string;

  @IsOptional()
  @IsDate()
  open: Date;

  @IsOptional()
  @IsDate()
  close: Date;

  @IsOptional()
  @IsEnum(WEEKSTATE)
  status: WEEKSTATE;
}
