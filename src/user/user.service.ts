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
import { Product } from '../product/product.model';

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

  //Find or Create Order
  async cartCreate(userId, product) {
    const order = await this.orderRepository.findOrCreate({
      where: { userId: userId, state: 'open' },
    });
    return await this.orderDetailRepository.create({
      quantity: product.quantity,
      orderId: order[0].dataValues.id,
      productId: product.productId,
    });
  }

  //Update item quantity
  async cartUpdate(userId, product) {
    const order = await this.orderRepository.findOne({
      where: {
        userId: userId,
        state: 'open',
      },
    });
    const orderDetail = await this.orderDetailRepository.findOne({
      where: {
        orderId: order.id,
        productId: product.productId,
      },
    });
    orderDetail.quantity = product.quantity;
    return orderDetail.save();
  }

  async deleteOrder(id: number) {
    return await Order.destroy({
      where: { userId: id, state: 'open' },
    });
  }

  async getAllItems(id: number) {
    let object = {};
    const order = await Order.findOne({
      where: {
        userId: id,
        state: 'open',
      },
      include: [
        { model: Product, as: 'products' },
        { model: User, as: 'user' },
      ],
    });
    // console.log('ORDER', order.dataValues.id);
    if (order) {
      const orderDetail = await OrderDetail.findAll({
        where: {
          orderId: order.dataValues.id,
        },
      });
      // console.log('ORDERDETAIL', orderDetail);
      object = {
        orderId: order.dataValues.id,
        products: order.dataValues.products,
        orderDetail,
      };
    }
    return object;
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
