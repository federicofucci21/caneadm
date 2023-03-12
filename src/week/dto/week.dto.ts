import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class WeekDto {
  readonly name: string;
  readonly detail: string;
  readonly open: Date;
  readonly close: Date;
  readonly status: string;
}

export class WeekDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  detail: string;

  @IsNotEmpty()
  @IsDate()
  open: Date;

  @IsOptional()
  @IsString()
  close: Date;

  @IsOptional()
  @IsDate()
  status: string;
}

export class IncomeUpdateDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  detail: string;

  @IsNotEmpty()
  @IsDate()
  open: Date;

  @IsOptional()
  @IsString()
  close: Date;

  @IsOptional()
  @IsDate()
  status: string;
}
