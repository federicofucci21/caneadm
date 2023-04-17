import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { ProductsForOrderDTO } from '../../order/dto/order.dto';

describe('ProductController', () => {
  let controller: ProductController;

  const mockProductsArray: ProductsForOrderDTO[] = [
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
  const mockProductService = {
    findAll: jest.fn().mockImplementation(() => mockProductsArray),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    })
      .overrideProvider(ProductService)
      .useValue(mockProductService)
      .compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  // Get All Products
  it('should return all products', async () => {
    expect(await controller.getAllProducts()).toEqual(mockProductsArray);
    expect(await controller.getAllProducts()).toHaveLength(3);
    expect(mockProductService.findAll).toHaveBeenCalled();
  });
});
