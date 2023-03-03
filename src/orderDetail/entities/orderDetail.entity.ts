import { BaseEntity } from '../../config/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'orderDetails' })
export class OrderDetailEntity extends BaseEntity {
  @Column()
  quantity: number;

  @Column()
  price: number;
}
