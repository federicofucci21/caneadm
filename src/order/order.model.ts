import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Order extends Model {
  @Column
  state: string;

  @Column
  price: number;
}
