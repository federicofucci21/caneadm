import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProviderEntity } from 'src/provider/entities/provider.entity';

export class ExpensesDto {
  readonly amount: number;
  readonly detail: string;
  readonly date: Date;
}

export class ExpensesDTO {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  detail: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  provider: ProviderEntity;
}

export class ExpensesUpdateDTO {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  detail: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  provider: ProviderEntity;
}
