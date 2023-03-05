import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { OrderEntity } from '../../order/entities/order.entity';
import { ProductEntity } from '../../product/entities/product.entity';

@Entity({ name: 'order_details' })
export class OrderDetailEntity extends BaseEntity {
  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderDetailIncludes)
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderDetailProduct)
  product: ProductEntity;
}
