import { Column, Entity, OneToMany } from 'typeorm';
import { ProductsForOrderEntity } from '../../order/entities/productOrder.entity';
import { BaseEntity } from '../../config/base.entity';
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

  @OneToMany(() => ProductsForOrderEntity, (prodOrder) => prodOrder.product)
  productOrder: ProductsForOrderEntity[];
}
