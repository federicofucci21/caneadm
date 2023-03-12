import { Column, Entity, ManyToOne } from 'typeorm';
import { WeekEntity } from '../../week/entities/week.entity';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'outgoes' })
export class OutgoEntity extends BaseEntity {
  @Column()
  amount: number;

  @Column()
  detail: string;

  @Column()
  date: Date;

  @ManyToOne(() => WeekEntity, (week) => week.outgo)
  week: WeekEntity;
}
