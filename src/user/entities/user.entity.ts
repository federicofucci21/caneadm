import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { OrderEntity } from '../../order/entities/order.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  cell: string;

  @Column()
  address: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}
