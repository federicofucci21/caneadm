import { OrderEntity } from './entities/order.entity';

export const orderProviders = [
  {
    provide: 'ORDER_REPOSITORY',
    useValue: OrderEntity,
  },
];
