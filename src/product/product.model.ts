import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Order } from '../order/order.model';
import { OrderDetail } from '../orderDetail/orderDetail.model';

@Table
export class Product extends Model<Product> {
  @Column
  name: string;

  @Column
  price: number;

  @Column
  stock: number;

  @Column({ defaultValue: true })
  isActive: boolean;

  @BelongsToMany(() => Order, () => OrderDetail)
  orders: Order[];
}
