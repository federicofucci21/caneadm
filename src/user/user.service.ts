import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.model';
import { UserDto } from './dto/user.dto';
import {
  ORDER_DETAIL_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_REPOSITORY,
  USER_REPOSITORY,
} from '../core/constants';
import { Order } from '../order/order.model';
import { OrderDetail } from '../orderDetail/orderDetail.model';
import { Product } from '../product/product.model';
import { totalCalculator } from '../helpers/total';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
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
    console.log('ORDER', order);
    const priceProduct = await this.productRepository.findByPk(
      product.productId,
    );
    const updateOrder = await this.orderRepository.findByPk(
      order[0].dataValues.id,
    );
    const totalPrice = totalCalculator(
      product.quantity,
      priceProduct.price,
      updateOrder.total,
    );
    await updateOrder.update({
      total: totalPrice,
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

  //Delete Order
  async deleteOrder(id: number) {
    return await Order.destroy({
      where: { userId: id, state: 'open' },
    });
  }

  //Get all Order's Item
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
    if (order) {
      const orderDetail = await OrderDetail.findAll({
        where: {
          orderId: order.dataValues.id,
        },
      });
      object = {
        orderId: order.dataValues.id,
        products: order.dataValues.products,
        orderDetail,
      };
    }
    return object;
  }

  async deleteItem(orderId, productId) {
    console.log('productID', productId);
    console.log('orderId', orderId);
    return OrderDetail.destroy({
      where: { orderId: orderId.orderId, productId: productId },
    });
  }
}
