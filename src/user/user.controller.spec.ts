import { Test, TestingModule } from '@nestjs/testing';
import { orderProviders } from '../order/order.providers';
import { OrderService } from '../order/order.service';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { productProviders } from '../product/product.provider';

xdescribe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        OrderService,
        ...userProviders,
        ...orderProviders,
        ...productProviders,
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  xit('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
