import { OrderDetailEntity } from './entities/orderDetail.entity';

export const orderDetailProviders = [
  {
    provide: 'ORDER_DETAIL_REPOSITORY',
    useValue: OrderDetailEntity,
  },
];
