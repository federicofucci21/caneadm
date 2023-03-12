import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserEntity } from '../../user/entities/user.entity';
import { ProductsForOrderEntity } from '../entities/productOrder.entity';

export class OrderDTO {
  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsNumber()
  user: UserEntity;

  @IsNotEmpty()
  @IsArray()
  productsForOrder: Array<ProductsForOrderEntity>;
}

export class OrderUpdateDTO {
  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsNumber()
  total: number;

  @IsOptional()
  @IsNumber()
  user: UserEntity;

  @IsOptional()
  @IsArray()
  productsForOrder: Array<ProductsForOrderEntity>;
}
