import { Injectable, Inject } from '@nestjs/common';
import { OrderDetail } from './orderDetail.model';
// import { OrderDetailDto } from './dto/orderDetail.dto';
import { ORDER_DETAIL_REPOSITORY } from '../core/constants';

@Injectable()
export class OrderDetailService {
  constructor(
    @Inject(ORDER_DETAIL_REPOSITORY)
    private readonly orderDetailRepository: typeof OrderDetail,
  ) {}

  // async create(orderDetail: OrderDetailDto): Promise<OrderDetail> {
  //   return await this.orderDetailRepository.create<OrderDetail>(orderDetail);
  // }

  async findOneById(id: number): Promise<OrderDetail> {
    return await this.orderDetailRepository.findOne<OrderDetail>({
      where: { id },
    });
  }
}
