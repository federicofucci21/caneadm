import { Column, Entity, OneToMany } from 'typeorm';
import { ExpensesEntity } from '../../expenses/entities/expenses.entity';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'providers' })
export class ProviderEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  cell: string;

  @OneToMany(() => ExpensesEntity, (expenses) => expenses.provider)
  expenses: ExpensesEntity[];
}
