import { Column, Entity } from 'typeorm';
import { ADMINROLE } from '../../constants/roles';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'admins' })
export class AdminEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ADMINROLE,
    default: ADMINROLE.ADMIN,
  })
  role: ADMINROLE;

  @Column({ default: true })
  isActive: boolean;
}
