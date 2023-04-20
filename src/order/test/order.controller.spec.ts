import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../order.controller';
import { OrderService } from '../order.service';
import {
  mockOrder,
  mockOrderService,
  mockOrderUpdate,
  mockOrdersArray,
  mockProducts,
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
  // Get Order by ID
  it('should get an order by ID', async () => {
    expect(await controller.getOrderById('1')).toEqual(mockOrder);
    expect(mockOrderService.findOneById).toHaveBeenCalled();
    expect(mockOrderService.findOneById).toHaveBeenCalledWith(
      expect.any(Number),
    );
  });
  //Update Order
  it('should update an Order', async () => {
    expect(await controller.editOrder('1', mockProducts)).toEqual(mockOrder);
    expect(mockOrderService.updateOrder).toBeCalledWith(
      expect.any(Number),
      mockProducts,
    );
  });
  //Update order state
  it('should update order state', async () => {
    expect(await controller.editStateOrder('1', mockOrderUpdate)).toEqual(true);
    expect(mockOrderService.updateStateOrder).toBeCalledWith(
      expect.any(Number),
      mockOrderUpdate,
    );
  });
});
