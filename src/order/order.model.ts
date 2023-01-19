import {
  Column,
  Model,
  Table,
  BelongsTo,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';
import { OrderDetail } from 'src/orderDetail/orderDetail.model';
import { Product } from 'src/product/product.model';
import { User } from 'src/user/user.model';

@Table
export class Order extends Model {
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