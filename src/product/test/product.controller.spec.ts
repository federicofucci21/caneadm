import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import {
  mockProduct,
  mockProductService,
  mockProductsArray,
} from '../__mock__/mockProduct.controller';

describe('ProductController', () => {
  let controller: ProductController;

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
  //Update Product
  it('should update a product', async () => {
    expect(await controller.updateProduct('1', mockProduct)).toEqual(
      mockProduct,
    );
    expect(mockProductService.updateProduct).toBeCalledWith(
      expect.any(Number),
      mockProduct,
    );
  });
});
