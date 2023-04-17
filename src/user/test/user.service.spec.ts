import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WeekService } from '../../week/week.service';
import { OrderEntity } from '../../order/entities/order.entity';
import { ProductsForOrderEntity } from '../../order/entities/productOrder.entity';
import { ProductEntity } from '../../product/entities/product.entity';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../user.service';
import {
  mockOpenWeek,
  mockOrdersArray,
  mockProductsArray,
  mockUserPost,
} from '../__mock__/mockUser.controller';
import { HttpException } from '@nestjs/common/exceptions';
import {
  mockOrderRepository,
  mockProductOrderRepository,
  mockproductRepository,
  mockUserRepository,
  mockWeekService,
} from '../__mock__/mockUser.service';
import { UserDTO } from '../dto/user.dto';
import { WeekDTO } from '../../week/dto/week.dto';
import { ProductsForOrderDTO } from '../../order/dto/order.dto';

describe('UserController', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        WeekService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(ProductsForOrderEntity),
          useValue: mockProductOrderRepository,
        },
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: mockOrderRepository,
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: mockproductRepository,
        },
      ],
    })
      .overrideProvider(WeekService)
      .useValue(mockWeekService)
      .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  // createUser
  it('should create a User', async () => {
    expect(await service.createUser(mockUserPost)).toEqual({
      id: expect.any(Number),
      ...mockUserPost,
    });
    expect(mockUserRepository.save).toHaveBeenCalled();
  });
  // get all users
  it('should get all users', async () => {
    expect(await service.findUsers()).toHaveLength(3);
    expect(mockUserRepository.find).toHaveBeenCalled();
  });
  it('should return an error when database is empty', async () => {
    mockUserRepository.find.mockResolvedValueOnce(undefined);

    await expect(service.findUsers()).rejects.toThrow(HttpException);
  });
  // get user by Id
  it('should return user by Id', async () => {
    mockUserRepository.getOne.mockResolvedValueOnce({
      id: 1,
      name: 'John Nash',
    });
    const result = await service.getById(1);
    expect(result).toEqual({ id: 1, name: 'John Nash' });
    expect(mockUserRepository.createQueryBuilder).toHaveBeenCalled();
    expect(mockUserRepository.where).toHaveBeenCalledWith({ id: 1 });
    expect(mockUserRepository.getOne).toHaveBeenCalled();
  });
  it('should return an error when is called with wrong info', async () => {
    mockUserRepository.getOne.mockResolvedValueOnce(undefined);

    await expect(service.getById(1)).rejects.toThrow(HttpException);
  });
  // get user by Cell
  it('should return user by cellphone', async () => {
    mockUserRepository.getOne.mockResolvedValueOnce({
      id: 1,
      name: 'John Nash',
      cell: '12345678',
    });
    const result = await service.findOneByCell('12345678');
    expect(result).toEqual({ id: 1, name: 'John Nash', cell: '12345678' });
    expect(mockUserRepository.createQueryBuilder).toHaveBeenCalled();
    expect(mockUserRepository.where).toHaveBeenCalledWith({ cell: '12345678' });
    expect(mockUserRepository.getOne).toHaveBeenCalled();
  });
  it('should return an error when is called with wrong cell', async () => {
    mockUserRepository.getOne.mockResolvedValueOnce(undefined);

    await expect(service.findOneByCell('12345678')).rejects.toThrow(
      HttpException,
    );
  });
  //deleteUser
  it('should delete user', async () => {
    mockUserRepository.update.mockResolvedValueOnce({ affected: 1 });
    const result = await service.deleteUser(1);
    expect(result).toEqual({ id: 1, ...mockUserPost });
    expect(mockUserRepository.update).toHaveBeenCalled();
    expect(mockUserRepository.createQueryBuilder).toHaveBeenCalled();
    expect(mockUserRepository.where).toHaveBeenCalledWith({ id: 1 });
    expect(mockUserRepository.getOne).toHaveBeenCalled();
  });
  it('should error on delete user', async () => {
    mockUserRepository.update.mockResolvedValueOnce({ affected: 0 });
    await expect(service.deleteUser(1)).rejects.toThrow(HttpException);
  });
  //updateUser
  it('should update user', async () => {
    mockUserRepository.update.mockResolvedValueOnce({ affected: 1 });
    const result = await service.updateUser(1, mockUserPost);
    expect(result).toEqual({ id: 1, ...mockUserPost });
    expect(mockUserRepository.update).toHaveBeenCalledWith(1, mockUserPost);
    expect(mockUserRepository.createQueryBuilder).toHaveBeenCalled();
    expect(mockUserRepository.where).toHaveBeenCalledWith({ id: 1 });
    expect(mockUserRepository.getOne).toHaveBeenCalled();
  });
  it('should error on update user', async () => {
    mockUserRepository.update.mockResolvedValueOnce({ affected: 0 });
    await expect(service.updateUser(1, mockUserPost)).rejects.toThrow(
      HttpException,
    );
  });
  //create an order
  it('should create an order', async () => {
    const userId = 1;
    const products: ProductsForOrderDTO[] = mockProductsArray;
    const weekOpen: WeekDTO = mockOpenWeek;
    const user: UserDTO = mockUserPost;
    const order = {
      user,
      productsForOrder: products,
      total: 55,
      week: weekOpen,
    };

    const getByIdSpy = jest.spyOn(service, 'getById').mockResolvedValue({
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      orders: [],
      ...user,
    });
    const findOpenWeekSpy = jest
      .spyOn(mockWeekService, 'findOpenWeek')
      .mockResolvedValue(weekOpen);
    const saveProductsSpy = jest
      .spyOn(mockProductOrderRepository, 'save')
      .mockResolvedValue(products.map((p) => ({ id: 1, ...p })));
    const findOneBySpy = jest
      .spyOn(mockproductRepository, 'findOneBy')
      .mockResolvedValue({
        id: 1,
        name: 'Product 1',
        price: 10,
        stock: 5,
      });
    const updateSpy = jest
      .spyOn(mockproductRepository, 'update')
      .mockResolvedValue({ affected: 1 } as any);

    const saveSpy = jest
      .spyOn(mockOrderRepository, 'save')
      .mockResolvedValue({ id: 1, ...order } as any);
    const result = await service.orderCreate(userId, products);

    expect(result).toEqual({ id: 1, ...order });
    expect(getByIdSpy).toHaveBeenCalledTimes(1);
    expect(getByIdSpy).toHaveBeenCalledWith(userId);
    expect(findOpenWeekSpy).toHaveBeenCalledTimes(1);
    expect(saveProductsSpy).toHaveBeenCalledTimes(1);
    expect(saveProductsSpy).toHaveBeenCalledWith(products);
    expect(findOneBySpy).toHaveBeenCalledTimes(products.length);
    expect(updateSpy).toHaveBeenCalledTimes(products.length);
    expect(saveSpy).toHaveBeenCalledTimes(1);
  });
  it('should return error when there is not an open week', async () => {
    mockWeekService.findOpenWeek.mockResolvedValueOnce(undefined);
    await expect(service.orderCreate(1, mockProductsArray)).rejects.toThrow(
      HttpException,
    );
  });
  //all users orders
  it('should get all user orders', async () => {
    const result = await service.allUserOrders(1);

    expect(result).toEqual(mockOrdersArray);
    expect(mockOrderRepository.createQueryBuilder).toHaveBeenCalled();
    expect(mockOrderRepository.where).toHaveBeenCalled();
    expect(mockOrderRepository.leftJoinAndSelect).toHaveBeenCalled();
    expect(mockOrderRepository.leftJoinAndSelect).toBeCalledTimes(2);
    expect(mockOrderRepository.getMany).toBeCalledTimes(1);
  });
  it('should throw an error is user do not have any order', async () => {
    mockOrderRepository.getMany.mockResolvedValueOnce(undefined);
    await expect(service.allUserOrders(1)).rejects.toThrow(HttpException);
  });
});
