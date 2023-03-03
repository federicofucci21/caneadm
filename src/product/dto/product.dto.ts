import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProductDto {
  readonly name: string;
  readonly price: number;
  readonly stock: number;
  readonly isActive: boolean;
}

export class ProductDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

export class ProductUpdateDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
