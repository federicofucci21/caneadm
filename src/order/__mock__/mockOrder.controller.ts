import { mockUserPost } from '../../user/__mock__/mockUser.controller';
import { UserEntity } from '../../user/entities/user.entity';
import { WeekEntity } from '../../week/entities/week.entity';
import {
  OrderDTO,
  OrderUpdateDTO,
  ProductsForOrderUpdateDTO,
} from '../dto/order.dto';
import { OrderEntity } from '../entities/order.entity';
import { ORDERSTATE } from '../../constants/order';
export const mockOrderService = {
  allOrders: jest.fn().mockImplementation(() => mockOrdersArray),
  findOneById: jest.fn().mockImplementation(() => mockOrder),
  updateStateOrder: jest.fn().mockImplementation(() => true),
  updateOrder: jest.fn().mockImplementation(() => mockOrder),
};

export const mockOrder: OrderDTO = {
  total: 100,
  user: new UserEntity(),
  productsForOrder: [],
  week: new WeekEntity(),
};
export const mockOrderUpdate: OrderUpdateDTO = {
  total: 100,
  user: new UserEntity(),
  productsForOrder: [],
  week: new WeekEntity(),
  state: ORDERSTATE.OPEN,
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

export const mockProducts: ProductsForOrderUpdateDTO[] = [
  {
    quantity: 10,
    product: {
      id: 1,
      name: 'Product 1',
      price: 10,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      stock: 100,
      productOrder: [],
    },
  },
];

export const mockOrdersUpdateArray: OrderUpdateDTO = {
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
  state: ORDERSTATE.OPEN,
};
