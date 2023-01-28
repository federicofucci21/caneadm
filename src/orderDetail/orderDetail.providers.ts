import { OrderDetail } from './orderDetail.model';
import { ORDER_DETAIL_REPOSITORY } from '../core/constants';

export const orderDetailProviders = [
  {
    provide: ORDER_DETAIL_REPOSITORY,
    useValue: OrderDetail,
  },
];
