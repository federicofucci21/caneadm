import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'outgoes' })
export class OutgoEntity extends BaseEntity {
  @Column()
  amount: number;

  @Column()
  detail: string;

  @Column()
  date: Date;
}
