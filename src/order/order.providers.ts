import { Order } from './order.model';
import { ORDER_REPOSITORY } from 'src/core/constants';

export const orderProviders = [
  {
    provide: ORDER_REPOSITORY,
    useValue: Order,
  },
];
