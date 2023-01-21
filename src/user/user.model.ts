import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Order } from 'src/order/order.model';

@Table
export class User extends Model<User> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  celphone: number;

  @Column
  address: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @HasMany(() => Order)
  order: Order[];
}
