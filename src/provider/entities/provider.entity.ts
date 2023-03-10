import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'providers' })
export class ProviderEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  cell: string;

  //   @ManyToOne(() => ExpensesEntity, (expenses) => expenses.provider)
  //   expenses: ExpensesEntity[];
}
