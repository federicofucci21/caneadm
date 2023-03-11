import { ProviderEntity } from '../../provider/entities/provider.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';

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
}
