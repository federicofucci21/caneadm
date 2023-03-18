import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProductDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  stock: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;
}

export class ProductUpdateDTO {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  price: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  stock: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;
}
