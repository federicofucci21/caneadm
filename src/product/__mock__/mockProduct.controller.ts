import { ProductsForOrderDTO } from 'src/order/dto/order.dto';
import { ProductEntity } from '../entities/product.entity';

export const mockProduct: ProductEntity = {
  id: 1,
  name: 'Product 1',
  price: 10,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  stock: 100,
  productOrder: [],
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
export const mockProductService = {
  findAll: jest.fn().mockImplementation(() => mockProductsArray),
  findOneById: jest.fn().mockImplementation(() => mockProduct),
  createProduct: jest.fn().mockImplementation(() => mockProduct),
  deleteProduct: jest.fn().mockImplementation(() => mockProduct),
  updateProduct: jest.fn().mockImplementation(() => mockProduct),
};
