import { IsNumber, IsOptional, IsString } from 'class-validator';

export class OrderDto {
  readonly state: string;
  readonly total: number;
  readonly userId: number;
}

export class OrderDTO {
  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsNumber()
  total: number;
}
