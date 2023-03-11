import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'incomes' })
export class IncomeEntity extends BaseEntity {
  @Column()
  amount: number;

  @Column()
  detail: string;

  @Column()
  date: Date;
}
