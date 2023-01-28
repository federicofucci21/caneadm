import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.model';
import { UserDto } from './dto/user.dto';
import {
  ORDER_DETAIL_REPOSITORY,
  ORDER_REPOSITORY,
  USER_REPOSITORY,
} from '../core/constants';
import { Order } from '../order/order.model';
import { OrderDetail } from '../orderDetail/orderDetail.model';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
    @Inject(ORDER_DETAIL_REPOSITORY)
    private readonly orderDetailRepository: typeof OrderDetail,
  ) {}

  async createUser(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async getById(id: number): Promise<User> {
    return await this.userRepository.findByPk<User>(id);
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.userRepository.findByPk(id);
    if (user.isActive) {
      return await user.update({
        isActive: false,
      });
    }
    return await user.update({
      isActive: true,
    });
  }

  cartCreate(userId, product) {
    console.log('productId', product.productId);
    console.log('userId', userId);
    console.log('quantity', product.quantity);
    if (userId) {
      this.orderRepository
        .findOne({ where: { userId: userId, state: 'open' } })
        .then((order) => {
          if (!order) {
            return this.orderRepository.create({
              state: 'open',
            });
          }
          return order;
        })
        .then((order) => {
          console.log('orderrr', order);
          order.userId = userId;
          console.log('orderrr22', order);
          return order.save();
        })
        .then((order): Promise<OrderDetail> => {
          if (product.productId) {
            return this.orderDetailRepository.create({
              quantity: product.quantity,
              orderId: order.id,
              productId: product.productId,
            });
          }
        })
        .catch((err) => {
          return err;
        });
    } else {
      return 'bad';
    }
  }
}
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { User } from './user.model';

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectModel(User)
//     private userModel: typeof User,
//   ) {}

//   async findAll(): Promise<User[]> {
//     return this.userModel.findAll();
//   }

//   findOne(id: string): Promise<User> {
//     return this.userModel.findOne({
//       where: {
//         id,
//       },
//     });
//   }

//   // async remove(id: string): Promise<void> {
//   //   const user = await this.findOne(id);
//   //   await user.destroy();
//   // }
// }
