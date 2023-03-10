import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { ProductEntity } from '../../product/entities/product.entity';
import { OrderEntity } from './order.entity';

@Entity()
export class ProductsForOrderEntity extends BaseEntity {
  @Column()
  quantity: number;

  @ManyToOne(() => ProductEntity, (product) => product.productOrder)
  product: ProductEntity;

  @ManyToOne(() => OrderEntity, (order) => order.productsForOrder)
  orderInclude: OrderEntity;
}
