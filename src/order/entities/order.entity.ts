import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { BaseEntity } from '../../config/base.entity';
import { ProductsForOrder } from '../../helpers/productsForOrder';

@Entity({ name: 'orders' })
export class OrderEntity extends BaseEntity {
  @Column({ default: 'open' })
  state: string;

  @Column({ default: 0 })
  total: number;

  @Column('simple-array')
  allProducts: ProductsForOrder[];

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;
}
