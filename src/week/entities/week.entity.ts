import { ExpensesEntity } from '../../expenses/entities/expenses.entity';
import { IncomeEntity } from '../../income/entities/income.entity';
import { OrderEntity } from '../../order/entities/order.entity';
import { OutgoEntity } from '../../outgo/entities/outgo.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';

export enum WeekState {
  OPEN = 'open',
  CLOSE = 'close',
}

@Entity({ name: 'weeks' })
export class WeekEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  detail: string;

  @Column()
  open: Date;

  @Column()
  close: Date;

  @Column({
    type: 'enum',
    enum: WeekState,
    default: WeekState.OPEN,
  })
  status: WeekState;

  @OneToMany(() => OrderEntity, (order) => order.week)
  order: OrderEntity[];

  @OneToMany(() => ExpensesEntity, (expenses) => expenses.week)
  expenses: ExpensesEntity[];

  @OneToMany(() => OutgoEntity, (outgo) => outgo.week)
  outgo: OutgoEntity[];

  @OneToMany(() => IncomeEntity, (income) => income.week)
  income: IncomeEntity[];
}
