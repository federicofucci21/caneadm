import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class OutgoDto {
  readonly amount: number;
  readonly detail: string;
  readonly date: Date;
}

export class OutgoDTO {
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

export class OutgoUpdateDTO {
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
