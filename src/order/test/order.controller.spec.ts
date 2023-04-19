import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../order.controller';
import { OrderService } from '../order.service';
import {
  mockOrderService,
  mockOrdersArray,
} from '../__mock__/mockOrder.controller';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue(mockOrderService)
      .compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  // Get all Orders
  it('should return all orderes', async () => {
    expect(await controller.getAllOrders()).toEqual(mockOrdersArray);
    expect(await controller.getAllOrders()).toHaveLength(1);
    expect(mockOrderService.allOrders).toHaveBeenCalled();
  });
});
