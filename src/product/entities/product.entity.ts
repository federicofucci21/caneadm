import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { OrderDetailEntity } from '../../orderDetail/entities/orderDetail.entity';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.product)
  orderDetailProduct: OrderDetailEntity[];
}
