import { ProviderEntity } from '../../provider/entities/provider.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'expenses' })
export class ExpensesEntity extends BaseEntity {
  @Column()
  amount: number;

  @Column()
  detail: string;

  @Column()
  date: Date;

  @OneToOne(() => ProviderEntity)
  @JoinColumn()
  provider: ProviderEntity;
}
