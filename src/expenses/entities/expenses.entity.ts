import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'expenses' })
export class ExpensesEntity extends BaseEntity {
  @Column()
  amount: number;

  @Column()
  detail: string;

  @Column()
  date: Date;

  //   @ManyToOne(() => ExpensesEntity, (expenses) => expenses.provider)
  //   expenses: ExpensesEntity[];
}
