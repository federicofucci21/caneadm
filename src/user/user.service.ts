import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO, UserUpdateDTO } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { OrderEntity } from '../order/entities/order.entity';
import { OrderDTO, ProductsForOrderDTO } from '../order/dto/order.dto';
import { totalPrice } from '../helpers/total';
import { ProductsForOrderEntity } from '../order/entities/productOrder.entity';
import { WeekService } from '../week/week.service';
import { ProductEntity } from '../product/entities/product.entity';
import { WeekEntity } from '../week/entities/week.entity';
import { ErrorManager } from '../helpers/error.manager';

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductsForOrderEntity)
    private readonly productOrderRepository: Repository<ProductsForOrderEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly weekService: WeekService,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public async createUser(body: UserDTO): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.userRepository.save(body);
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `User not created`,
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUsers(): Promise<UserEntity[]> {
    try {
      const users: UserEntity[] = await this.userRepository.find();
      if (!users.length) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `No users on DataBase`,
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOneByEmail(email: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('users')
        .where({ email })
        .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `We cannot find user with email ${email}`,
        });
      }

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOneByCell(cell: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('users')
        .where({ cell })
        .getOne();
      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `User with cellphone number: ${cell} do not exist`,
        });
      } else {
        return user;
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async getById(id: number): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('users')
        .where({ id })
        .getOne();
      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `User with ID: ${id} do not exist`,
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteUser(id: number): Promise<UserEntity> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, {
        isActive: false,
      });

      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `User with identification ${id} doesn't found on database`,
        });
      }
      return await this.getById(id);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateUser(
    id: number,
    body: UserUpdateDTO,
  ): Promise<UserEntity> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `The user with ID: ${id} doesn't found on database`,
        });
      }
      return await this.getById(id);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async orderCreate(
    userId: number,
    products: Array<ProductsForOrderDTO>,
  ): Promise<OrderEntity> {
    try {
      const weekOpen: WeekEntity = await this.weekService.findOpenWeek();
      if (!weekOpen) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: "We don't have an open week, please open one",
        });
      }

      const order: OrderDTO = {
        user: await this.getById(userId),
        productsForOrder: await this.productOrderRepository.save(products),
        total: totalPrice(products),
        week: weekOpen,
      };
      products.forEach(async (e) => {
        const id = e.product.id;
        const productStock = await this.productRepository.findOneBy({ id });
        const body = {
          stock: productStock.stock - e.quantity,
        };
        await this.productRepository.update(id, body);
      });
      return await this.orderRepository.save(order);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async allUserOrders(id: number): Promise<OrderEntity[]> {
    try {
      const orders: OrderEntity[] = await this.orderRepository
        .createQueryBuilder('orders')
        .where({ user: id })
        .leftJoinAndSelect('orders.productsForOrder', 'productsForOrder')
        .leftJoinAndSelect('productsForOrder.product', 'product')
        .getMany();
      if (!orders.length) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `user with id: ${id}, have no orders on database`,
        });
      }
      return orders;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
