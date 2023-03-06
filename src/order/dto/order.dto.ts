import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductsForOrder } from 'src/helpers/productsForOrder';
import { UserEntity } from '../../user/entities/user.entity';

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

  @IsNotEmpty()
  @IsNumber()
  user: UserEntity;

  @IsNotEmpty()
  @IsArray()
  allProducts: Array<ProductsForOrder>;
}
