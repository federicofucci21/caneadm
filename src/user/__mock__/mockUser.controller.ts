import { USERSROLE } from '../../constants/roles';
import { OrderDTO, ProductsForOrderDTO } from '../../order/dto/order.dto';
import { ProductEntity } from '../../product/entities/product.entity';
import { WeekEntity } from '../../week/entities/week.entity';
import { UserDTO } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';

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
    console.log('RES', res);
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

export const mockUserPostError: UserDTO = {
  firstName: 'error',
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
  product: new ProductEntity(),
};

export const mockProductsArray: ProductsForOrderDTO[] = [
  mockProducts,
  mockProducts,
  mockProducts,
];
