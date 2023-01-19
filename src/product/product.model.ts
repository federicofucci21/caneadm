import { Column, Model, Table } from 'sequelize-typescript';

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
}
