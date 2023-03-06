import { ProductsForOrder } from './productsForOrder';

export function totalCalculator(
  quantity: number,
  price: number,
  lastTotal: number,
) {
  return lastTotal + quantity * price;
}

export const totalPrice = (prod: Array<ProductsForOrder>) => {
  return prod.reduce((acc, cur) => acc + cur.products.price * cur.quantity, 0);
};
