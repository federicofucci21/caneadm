import { Column, Entity } from 'typeorm';
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
}
