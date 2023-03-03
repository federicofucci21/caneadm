import { UserDTO, UserUpdateDTO } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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

  // async findOneByEmail(email: string): Promise<User> {
  //   return await this.userRepository.findOne<User>({ where: { email } });
  // }

  public async findUserById(id: number): Promise<UserEntity> {
    try {
      return await this.userRepository
        .createQueryBuilder('users')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  //esto no hace soft delete OJO
  public async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      if (user.affected === 0) {
        return undefined;
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  // async deleteUser(id: string): Promise<User> {
  //   const user = await this.userRepository.findByPk(id);
  //   if (user.isActive) {
  //     return await user.update({
  //       isActive: false,
  //     });
  //   }
  //   return await user.update({
  //     isActive: true,
  //   });
  // }

  public async updateUser(
    body: UserUpdateDTO,
    id: string,
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
