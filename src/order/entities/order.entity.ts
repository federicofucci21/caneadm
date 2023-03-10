import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { BaseEntity } from '../../config/base.entity';
import { ProductsForOrderEntity } from './productOrder.entity';

@Entity({ name: 'orders' })
export class OrderEntity extends BaseEntity {
  @Column({ default: 'open' })
  state: string;

  @Column({ default: 0 })
  total: number;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @OneToMany(
    () => ProductsForOrderEntity,
    (prodOrder) => prodOrder.orderInclude,
  )
  productsForOrder: ProductsForOrderEntity[];
}
