import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WeekService } from '../../week/week.service';
import { OrderEntity } from '../../order/entities/order.entity';
import { ProductsForOrderEntity } from '../../order/entities/productOrder.entity';
import { ProductEntity } from '../../product/entities/product.entity';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../user.service';
import { mockUserPost } from '../__mock__/mockUser.controller';
import { HttpException } from '@nestjs/common/exceptions';
import {
  mockOrderRepository,
  mockProductOrderRepository,
  mockproductRepository,
  mockUserRepository,
  mockWeekService,
} from '../__mock__/mockUser.service';

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
  it('should create a User', async () => {
    expect(await service.createUser(mockUserPost)).toEqual({
      id: expect.any(Number),
      ...mockUserPost,
    });
    expect(mockUserRepository.save).toHaveBeenCalled();
  });
  it('should get all users', async () => {
    expect(await service.findUsers()).toHaveLength(3);
    expect(mockUserRepository.find).toHaveBeenCalled();
  });
  it('should return an error when database is empty', async () => {
    mockUserRepository.find.mockResolvedValueOnce(undefined);

    await expect(service.findUsers()).rejects.toThrow(HttpException);
  });
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
  it('should update user', async () => {
    mockUserRepository.update.mockResolvedValueOnce({ affected: 1 });
    const result = await service.updateUser(1, mockUserPost);
    expect(result).toEqual({ id: 1, ...mockUserPost });
    expect(mockUserRepository.update).toHaveBeenCalledWith(1, mockUserPost);
  });
  it('should error on update user', async () => {
    mockUserRepository.update.mockResolvedValueOnce({ affected: 0 });
    await expect(service.updateUser(1, mockUserPost)).rejects.toThrow(
      HttpException,
    );
  });
});
