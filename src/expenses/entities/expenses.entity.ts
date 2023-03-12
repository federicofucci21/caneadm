import { Column, Entity, ManyToOne } from 'typeorm';
import { ProviderEntity } from '../../provider/entities/provider.entity';
import { BaseEntity } from '../../config/base.entity';
import { WeekEntity } from '../../week/entities/week.entity';

@Entity({ name: 'expenses' })
export class ExpensesEntity extends BaseEntity {
  @Column()
  amount: number;

  @Column()
  detail: string;

  @Column()
  date: Date;

  @ManyToOne(() => ProviderEntity, (provider) => provider.expenses)
  provider: ProviderEntity;

  @ManyToOne(() => WeekEntity, (week) => week.expenses)
  week: WeekEntity;
}
