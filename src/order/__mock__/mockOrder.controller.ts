import { mockUserPost } from '../../user/__mock__/mockUser.controller';
import { UserEntity } from '../../user/entities/user.entity';
import { WeekEntity } from '../../week/entities/week.entity';
import { OrderDTO } from '../dto/order.dto';
import { OrderEntity } from '../entities/order.entity';

export const mockOrderService = {
  allOrders: jest.fn().mockImplementation(() => mockOrdersArray),
  findOneById: jest.fn().mockImplementation(() => mockOrder),
  createProduct: jest.fn().mockImplementation(() => mockOrder),
  deleteProduct: jest.fn().mockImplementation(() => mockOrder),
  updateProduct: jest.fn().mockImplementation(() => mockOrder),
};

export const mockOrder: OrderDTO = {
  total: 100,
  user: new UserEntity(),
  productsForOrder: [],
  week: new WeekEntity(),
};

export const mockOrdersArray: OrderDTO[] = [
  {
    user: {
      ...mockUserPost,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 1,
      orders: [],
    },
    productsForOrder: [
      {
        quantity: 1,
        product: {
          id: 3,
          name: 'Product 3',
          price: 20,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          stock: 100,
          productOrder: [],
        },
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        orderInclude: new OrderEntity(),
      },
    ],
    total: 55,
    week: new WeekEntity(),
  },
];
