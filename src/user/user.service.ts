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

  public async deleteUser(id: number): Promise<UserEntity | string> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, {
        isActive: false,
      });

      if (user.affected === 0) {
        return `The user with identification ${id} doesn't found on database`;
      }
      return await this.getById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateUser(
    id: number,
    body: UserUpdateDTO,
  ): Promise<UserEntity | string> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);
      if (user.affected === 0) {
        return `The user with identification ${id} doesn't found on database`;
      }
      return await this.getById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async orderCreate(
    userId: number,
    products: Array<ProductsForOrderDTO>,
  ): Promise<OrderEntity | string> {
    try {
      const weekOpen = await this.weekService.findOpenWeek();
      if (!weekOpen) {
        return "We don't have an open week, please open one";
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
      throw new Error(error);
    }
  }

  public async allUserOrders(id: number): Promise<OrderEntity[]> {
    try {
      return await this.orderRepository
        .createQueryBuilder('orders')
        .where({ user: id })
        .leftJoinAndSelect('orders.productsForOrder', 'productsForOrder')
        .leftJoinAndSelect('productsForOrder.product', 'product')
        .getMany();
    } catch (error) {
      throw new Error(error);
    }
  }
}
