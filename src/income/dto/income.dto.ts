import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class IncomeDto {
  readonly amount: number;
  readonly detail: string;
  readonly date: Date;
}

export class IncomeDTO {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  detail: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;
}

export class IncomeUpdateDTO {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  detail: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;
}
