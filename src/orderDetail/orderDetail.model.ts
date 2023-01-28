import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Order } from '../order/order.model';
import { Product } from '../product/product.model';

@Table
export class OrderDetail extends Model {
  @Column
  quantity: number;

  // @Column
  // price: number;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @ForeignKey(() => Order)
  @Column
  orderId: number;
}
