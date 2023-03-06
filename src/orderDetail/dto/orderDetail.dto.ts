import { IsNotEmpty, IsNumber } from 'class-validator';
import { ProductEntity } from '../../product/entities/product.entity';
import { OrderEntity } from '../../order/entities/order.entity';

export class OrderDetailDto {
  readonly quantity: number;
  readonly price: number;
  readonly productId: number;
  readonly orderId: number;
}

export class OrderDetailDTO {
  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  order: OrderEntity;

  @IsNotEmpty()
  @IsNumber()
  product: ProductEntity;
}
