import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';

export enum AdminRole {
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}

@Entity({ name: 'admins' })
export class AdminEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: AdminRole,
    default: AdminRole.ADMIN,
  })
  role: AdminRole;

  @Column({ default: true })
  isActive: boolean;
}
