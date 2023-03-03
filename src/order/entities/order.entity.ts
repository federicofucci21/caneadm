import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'orders' })
export class OrderEntity extends BaseEntity {
  @Column()
  state: string;

  @Column()
  total: number;
}
