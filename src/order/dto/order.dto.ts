import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ORDERSTATE } from '../../constants/order';
import { WeekEntity } from '../../week/entities/week.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { ProductsForOrderEntity } from '../entities/productOrder.entity';
import { ProductEntity } from '../../product/entities/product.entity';

export class OrderDTO {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  total: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  user: UserEntity;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ type: [ProductsForOrderEntity] })
  productsForOrder: Array<ProductsForOrderEntity>;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  week: WeekEntity;
}

export class OrderUpdateDTO {
  @IsOptional()
  @IsEnum(ORDERSTATE)
  @ApiProperty({ enum: ORDERSTATE })
  state: ORDERSTATE;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  total: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  user: UserEntity;

  @IsOptional()
  @IsArray()
  @ApiProperty({ type: [ProductsForOrderEntity] })
  productsForOrder: Array<ProductsForOrderEntity>;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  week: WeekEntity;
}

export class ProductsForOrderDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  product: ProductEntity;
}

export class ProductsForOrderUpdateDTO {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  quantity: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  product: ProductEntity;
}
