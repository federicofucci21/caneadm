import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO, UserUpdateDTO } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { OrderEntity } from '../order/entities/order.entity';
import { OrderDTO } from '../order/dto/order.dto';
import { ProductsForOrder } from '../helpers/productsForOrder';
import { totalPrice } from '../helpers/total';

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  public async createUser(body: UserDTO): Promise<UserEntity> {
    try {
      return await this.userRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findUsers(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findOneByEmail(email: string): Promise<UserEntity> {
    try {
      return await this.userRepository
        .createQueryBuilder('users')
        .where({ email })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getById(id: number): Promise<UserEntity> {
    try {
      return await this.userRepository
        .createQueryBuilder('users')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async deleteUser(id: number): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, {
        isActive: false,
      });

      if (user.affected === 0) {
        return undefined;
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateUser(
    id: number,
    body: UserUpdateDTO,
  ): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);
      if (user.affected === 0) {
        return undefined;
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async orderCreate(userId: any, products: Array<ProductsForOrder>) {
    try {
      const order: OrderDTO = {
        user: userId,
        allProducts: products,
        total: totalPrice(products),
        state: 'open',
      };

      return this.orderRepository.save(order);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async allUserOrders(id: number): Promise<OrderEntity[]> {
    try {
      return this.orderRepository
        .createQueryBuilder('orders')
        .where({ user: id })
        .getMany();
    } catch (error) {
      throw new Error(error);
    }
  }
  //   //Find or Create Order
  //   async cartCreate(userId, product) {
  //     const order = await this.orderRepository.findOrCreate({
  //       where: { userId: userId, state: 'open' },
  //     });
  //     console.log('ORDER', order);
  //     const priceProduct = await this.productRepository.findByPk(
  //       product.productId,
  //     );
  //     const updateOrder = await this.orderRepository.findByPk(
  //       order[0].dataValues.id,
  //     );
  //     const totalPrice = totalCalculator(
  //       product.quantity,
  //       priceProduct.price,
  //       updateOrder.total,
  //     );
  //     await updateOrder.update({
  //       total: totalPrice,
  //     });

  //     return await this.orderDetailRepository.create({
  //       quantity: product.quantity,
  //       orderId: order[0].dataValues.id,
  //       productId: product.productId,
  //     });
  //   }

  //   //Update item quantity
  //   async cartUpdate(userId, product) {
  //     const order = await this.orderRepository.findOne({
  //       where: {
  //         userId: userId,
  //         state: 'open',
  //       },
  //     });
  //     const orderDetail = await this.orderDetailRepository.findOne({
  //       where: {
  //         orderId: order.id,
  //         productId: product.productId,
  //       },
  //     });
  //     orderDetail.quantity = product.quantity;
  //     return orderDetail.save();
  //   }

  //   //Delete Order
  //   async deleteOrder(id: number) {
  //     return await Order.destroy({
  //       where: { userId: id, state: 'open' },
  //     });
  //   }

  //   //Get all Order's Item
  //   async getAllItems(id: number) {
  //     let object = {};
  //     const order = await Order.findOne({
  //       where: {
  //         userId: id,
  //         state: 'open',
  //       },
  //       include: [
  //         { model: Product, as: 'products' },
  //         { model: User, as: 'user' },
  //       ],
  //     });
  //     if (order) {
  //       const orderDetail = await OrderDetail.findAll({
  //         where: {
  //           orderId: order.dataValues.id,
  //         },
  //       });
  //       object = {
  //         orderId: order.dataValues.id,
  //         products: order.dataValues.products,
  //         orderDetail,
  //       };
  //     }
  //     return object;
  //   }

  //   async deleteItem(orderId, productId) {
  //     console.log('productID', productId);
  //     console.log('orderId', orderId);
  //     return OrderDetail.destroy({
  //       where: { orderId: orderId.orderId, productId: productId },
  //     });
  //   }
}
