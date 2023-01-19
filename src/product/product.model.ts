import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Order } from 'src/order/order.model';
import { OrderDetail } from 'src/orderDetail/orderDetail.model';

@Table
export class Product extends Model {
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
