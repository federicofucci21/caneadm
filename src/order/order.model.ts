import {
  Column,
  Model,
  Table,
  BelongsTo,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';
import { OrderDetail } from '../orderDetail/orderDetail.model';
import { Product } from '../product/product.model';
import { User } from '../user/user.model';

@Table
export class Order extends Model<Order> {
  @Column
  state: string;

  @Column
  price: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Product, () => OrderDetail)
  products: Product[];
}
