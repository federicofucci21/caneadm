import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ORDERSTATE } from '../../constants/order';
import { WeekEntity } from '../../week/entities/week.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { ProductsForOrderEntity } from '../entities/productOrder.entity';

export class OrderDTO {
  @IsOptional()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsNumber()
  user: UserEntity;

  @IsNotEmpty()
  @IsArray()
  productsForOrder: Array<ProductsForOrderEntity>;

  @IsNotEmpty()
  @IsNumber()
  week: WeekEntity;
}

export class OrderUpdateDTO {
  @IsOptional()
  @IsEnum(ORDERSTATE)
  state: ORDERSTATE;

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
