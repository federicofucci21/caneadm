import { USER_REPOSITORY } from '../core/constants';
import { UserEntity } from './entities/user.entity';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: UserEntity,
  },
];
