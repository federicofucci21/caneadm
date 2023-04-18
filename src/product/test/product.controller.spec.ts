import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { ProductsForOrderDTO } from '../../order/dto/order.dto';
import { ProductEntity } from '../entities/product.entity';

describe('ProductController', () => {
  let controller: ProductController;

  const mockProduct: ProductEntity = {
    id: 1,
    name: 'Product 1',
    price: 10,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 100,
    productOrder: [],
  };

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
    findOneById: jest.fn().mockImplementation(() => mockProduct),
    createProduct: jest.fn().mockImplementation(() => mockProduct),
    deleteProduct: jest.fn().mockImplementation(() => mockProduct),
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
  // Get Product by ID
  it('should get a product by ID', async () => {
    expect(await controller.getProductrById('1')).toEqual(mockProduct);
    expect(mockProductService.findOneById).toHaveBeenCalled();
    expect(mockProductService.findOneById).toHaveBeenCalledWith(
      expect.any(Number),
    );
  });
  // Create Product
  it('should create a product', async () => {
    expect(await controller.createProduct(mockProduct)).toEqual(mockProduct);
    expect(mockProductService.createProduct).toHaveBeenCalledWith(mockProduct);
  });
  //Delete Product
  it('should delete a product', async () => {
    expect(await controller.deleteProduct('1')).toEqual(mockProduct);
    expect(mockProductService.deleteProduct).toHaveBeenCalledWith(
      expect.any(Number),
    );
  });
});
