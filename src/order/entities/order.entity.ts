import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OrderDetailEntity } from '../../orderDetail/entities/orderDetail.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'orders' })
export class OrderEntity extends BaseEntity {
  @Column()
  state: string;

  @Column()
  total: number;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.order)
  orderDetailIncludes: OrderDetailEntity[];
}
