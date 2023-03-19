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
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common/enums';
import { WeekEntity } from '../week/entities/week.entity';

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

  public async createUser(
    body: UserDTO,
    res: Response,
  ): Promise<UserEntity | Response> {
    try {
      const user: UserEntity = await this.userRepository.save(body);
      if (!user) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .header('Created', 'Not Created')
          .json({ message: `User not created` });
      }
      return res
        .status(HttpStatus.CREATED)
        .header('Created', 'User Created')
        .json(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findUsers(res: Response): Promise<UserEntity[] | Response> {
    try {
      const users: UserEntity[] = await this.userRepository.find();
      if (!users) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .header('Found', 'Users Not Found')
          .json({ message: `No users on DataBase` });
      }
      return res
        .status(HttpStatus.FOUND)
        .header('Found', `${users.length} users found on DataBase`)
        .json(users);
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

  public async findOneByCell(
    cell: string,
    res: Response,
  ): Promise<UserEntity | Response> {
    try {
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('users')
        .where({ cell })
        .getOne();
      if (!user) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .header('Found', 'Not Found')
          .json({
            message: `User with cellphone number: ${cell} do not exist`,
          });
      } else {
        return res
          .status(HttpStatus.FOUND)
          .header('Found', 'User Found')
          .json(user);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getById(
    id: number,
    res: Response,
  ): Promise<UserEntity | Response> {
    try {
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('users')
        .where({ id })
        .getOne();
      if (!user) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .header('Found', 'Not Found')
          .json({ message: `User with ID: ${id} do not exist` });
      } else {
        return res
          .status(HttpStatus.FOUND)
          .header('Found', `User with ID: ${id} found`)
          .json(user);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  public async deleteUser(
    id: number,
    res: Response,
  ): Promise<UserEntity | Response> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, {
        isActive: false,
      });

      if (user.affected === 0) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .header('Found', 'User not Found')
          .json({
            message: `User with identification ${id} doesn't found on database`,
          });
      }
      const userDeleted = await this.getById(id, res);
      return res
        .status(HttpStatus.OK)
        .header('Deleted', `User ID: ${id} deleted`)
        .json(userDeleted);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateUser(
    id: number,
    body: UserUpdateDTO,
    res: Response,
  ): Promise<UserEntity | Response> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);
      if (user.affected === 0) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .header('Found', 'User Not Found')
          .json({
            message: `The user with ID: ${id} doesn't found on database`,
          });
      }
      const userUpdated: UserEntity | Response = await this.getById(id, res);
      return res
        .status(HttpStatus.OK)
        .header('Updated', `The user ID: ${id} updated`)
        .json(userUpdated);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async orderCreate(
    userId: number,
    products: Array<ProductsForOrderDTO>,
    res: Response,
  ): Promise<OrderEntity | Response | any> {
    try {
      const weekOpen: WeekEntity = await this.weekService.findOpenWeek();
      if (!weekOpen) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .header('Found', 'week not found')
          .json({
            message: "We don't have an open week, please open one",
          });
      }

      const order: OrderDTO = {
        user: await this.getById(userId, res),
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
      const orderSaved = await this.orderRepository.save(order);
      return res.status(HttpStatus.OK).header('Saved', 'true').json(orderSaved);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async allUserOrders(
    id: number,
    res: Response,
  ): Promise<OrderEntity[] | Response> {
    try {
      const orders: OrderEntity[] = await this.orderRepository
        .createQueryBuilder('orders')
        .where({ user: id })
        .leftJoinAndSelect('orders.productsForOrder', 'productsForOrder')
        .leftJoinAndSelect('productsForOrder.product', 'product')
        .getMany();
      if (!orders.length) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .header('Found', 'Not Found')
          .json({ message: `user with id: ${id}, have no orders on database` });
      } else {
        return res
          .status(HttpStatus.FOUND)
          .header('Found', 'Orders Found')
          .json(orders);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
