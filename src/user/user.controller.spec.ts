import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { WeekEntity } from '../week/entities/week.entity';
import {
  mockProductsArray,
  mockUserPost,
  mockUserService,
} from './__mock__/mockUser.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a User', async () => {
    expect(await controller.createUser(mockUserPost)).toEqual({
      id: expect.any(Number),
      ...mockUserPost,
    });
    expect(mockUserService.createUser).toHaveBeenCalledWith(mockUserPost);
  });
  it('should get all users', async () => {
    expect(await controller.getAllUsers()).toHaveLength(3);
    expect(mockUserService.findUsers).toHaveBeenCalled();
  });
  it('should return one user by id', async () => {
    expect(await controller.getUserById('1')).toEqual({
      id: expect.any(Number),
      ...mockUserPost,
    });
    expect(mockUserService.getById).toHaveBeenCalled();
  });
  it('should find user by cell', async () => {
    expect(await controller.getUserByCell('3416745943')).toEqual({
      id: expect.any(Number),
      cell: '3416745943',
      ...mockUserPost,
    });
    expect(mockUserService.findOneByCell).toHaveBeenCalled();
  });
  it('should return update user', async () => {
    expect(await controller.editUser('1', mockUserPost)).toEqual({
      id: expect.any(Number),
      ...mockUserPost,
    });
    expect(mockUserService.updateUser).toHaveBeenCalledWith(
      expect.any(Number),
      mockUserPost,
    );
  });
  it('should soft delete a User', async () => {
    expect(await controller.deleteUser('1')).toEqual({
      id: expect.any(Number),
      isActive: false,
      ...mockUserPost,
    });
    expect(mockUserService.deleteUser).toHaveBeenCalledWith(expect.any(Number));
  });
  it('should create an Order', async () => {
    expect(await controller.orderCreate('1', mockProductsArray)).toEqual({
      total: 100,
      user: { id: 1, ...mockUserPost },
      productsForOrder: mockProductsArray,
      week: new WeekEntity(),
    });
  });
});
