export function totalCalculator(
  quantity: number,
  price: number,
  lastTotal: number,
) {
  return lastTotal + quantity * price;
}
