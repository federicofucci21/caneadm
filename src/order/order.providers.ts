import { Order } from './order.model';
import { ORDER_REPOSITORY } from '../core/constants';

export const orderProviders = [
  {
    provide: ORDER_REPOSITORY,
    useValue: Order,
  },
];
