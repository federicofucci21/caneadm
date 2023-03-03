import { BaseEntity } from '../../config/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  celphone: number;

  @Column()
  address: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: true })
  isFunny: boolean;

  @Column({ default: true })
  isHuman: boolean;
}
