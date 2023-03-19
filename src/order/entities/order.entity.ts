import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { BaseEntity } from '../../config/base.entity';
import { ProductsForOrderEntity } from './productOrder.entity';
import { WeekEntity } from '../../week/entities/week.entity';
import { ORDERSTATE } from '../../constants/order';

@Entity({ name: 'orders' })
export class OrderEntity extends BaseEntity {
  @Column({ type: 'enum', enum: ORDERSTATE, default: ORDERSTATE.OPEN })
  state: ORDERSTATE;

  @Column({ default: 0 })
  total: number;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity | any;

  @OneToMany(
    () => ProductsForOrderEntity,
    (prodOrder) => prodOrder.orderInclude,
  )
  productsForOrder: ProductsForOrderEntity[];

  @ManyToOne(() => WeekEntity, (week) => week.order)
  week: WeekEntity;
}
