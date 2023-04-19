import { WeekDTO } from '../../week/dto/week.dto';
import { USERSROLE } from '../../constants/roles';
import { OrderDTO, ProductsForOrderDTO } from '../../order/dto/order.dto';
import { WeekEntity } from '../../week/entities/week.entity';
import { UserDTO } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';
import { WEEKSTATE } from '../../constants/weekState';
import { OrderEntity } from '../../order/entities/order.entity';

export const mockUserService = {
  createUser: jest.fn().mockImplementation((body) => {
    return {
      id: 1,
      ...body,
    };
  }),
  findUsers: jest.fn().mockImplementation(() => mockUserArray),
  getById: jest.fn().mockImplementation((id) => {
    return {
      id: id,
      ...mockUserPost,
    };
  }),
  findOneByCell: jest.fn().mockImplementation((cell) => {
    return {
      id: 1,
      cell,
      ...mockUserPost,
    };
  }),
  updateUser: jest.fn().mockImplementation((id, body) => {
    return {
      id: id,
      ...body,
    };
  }),
  deleteUser: jest.fn().mockImplementation((id) => {
    return {
      id: id,
      isActive: false,
      ...mockUserPost,
    };
  }),
  orderCreate: jest.fn().mockImplementation((id, products) => {
    const res = {
      ...mockOrder,
      user: {
        id,
        ...mockUserPost,
      },
      productsForOrder: products,
    };
    return res;
  }),
};
export const mockUserArray: UserDTO[] = [
  {
    firstName: 'Fede',
    lastName: '',
    email: 'string',
    cell: '11111',
    address: 'string',
    isActive: true,
    role: USERSROLE.CLIENT,
  },
  {
    firstName: 'Fede',
    lastName: '',
    email: 'string',
    cell: '22222',
    address: 'string',
    isActive: true,
    role: USERSROLE.CLIENT,
  },
  {
    firstName: 'Fede',
    lastName: '',
    email: 'string',
    cell: '33333',
    address: 'string',
    isActive: true,
    role: USERSROLE.CLIENT,
  },
];

export const mockUserPost: UserDTO = {
  firstName: 'Fede',
  lastName: '',
  email: 'string',
  cell: '1234567',
  address: 'string',
  isActive: true,
  role: USERSROLE.CLIENT,
};

export const mockOrder: OrderDTO = {
  total: 100,
  user: new UserEntity(),
  productsForOrder: [],
  week: new WeekEntity(),
};

export const mockProducts: ProductsForOrderDTO = {
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
};

export const mockProductsArray: ProductsForOrderDTO[] = [
  {
    quantity: 2,
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
  {
    quantity: 1,
    product: {
      id: 2,
      name: 'Product 2',
      price: 15,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      stock: 100,
      productOrder: [],
    },
  },
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
  },
];

export const mockOpenWeek: WeekDTO = {
  name: 'string',
  detail: 'detail',
  open: new Date(),
  close: new Date(),
  status: WEEKSTATE.OPEN,
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
