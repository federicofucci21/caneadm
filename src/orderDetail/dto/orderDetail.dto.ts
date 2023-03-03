import { IsNumber } from 'class-validator';

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
}
