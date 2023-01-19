import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Order } from 'src/order/order.model';
import { Product } from 'src/product/product.model';

@Table
export class OrderDetail extends Model {
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @ForeignKey(() => Order)
  @Column
  orderId: number;
}
