import { ProductsForOrderEntity } from '../order/entities/productOrder.entity';

export function totalCalculator(
  quantity: number,
  price: number,
  lastTotal: number,
) {
  return lastTotal + quantity * price;
}

export const totalPrice = (prod: Array<ProductsForOrderEntity>) => {
  return prod.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0);
};
