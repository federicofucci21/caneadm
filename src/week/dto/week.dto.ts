import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  detail: string;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  open: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  close: Date;

  @IsOptional()
  @IsEnum(WEEKSTATE)
  @ApiProperty({ enum: WEEKSTATE })
  status: WEEKSTATE;
}

export class WeekUpdateDTO {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  detail: string;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  open: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  close: Date;

  @IsOptional()
  @IsEnum(WEEKSTATE)
  @ApiProperty({ enum: WEEKSTATE })
  status: WEEKSTATE;
}
