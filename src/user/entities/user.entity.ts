import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { OrderEntity } from '../../order/entities/order.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column({ default: 'cane' })
  lastName: string;

  @Column({ default: 'cane@cane.com' })
  email: string;

  @Column({ unique: true })
  cell: string;

  @Column({ default: 'casa 123' })
  address: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}
