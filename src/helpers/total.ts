import { ProductsForOrderDTO } from '../order/dto/order.dto';

export function totalCalculator(
  quantity: number,
  price: number,
  lastTotal: number,
) {
  return lastTotal + quantity * price;
}

export const totalPrice = (prod: Array<ProductsForOrderDTO>) => {
  return prod.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0);
};
