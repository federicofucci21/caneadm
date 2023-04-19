import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductService } from '../product.service';
import { ProductEntity } from '../entities/product.entity';
import { mockproductRepository } from '../__mock__/mockProduct.service';
import {
  mockProduct,
  mockProductsArray,
} from '../__mock__/mockProduct.controller';
import { HttpException } from '@nestjs/common';

describe('UserController', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: mockproductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a product', async () => {
    const result = await service.createProduct(mockProduct);
    expect(result).toEqual({ id: 1, ...mockProduct });
    expect(mockproductRepository.save).toBeCalledWith(mockProduct);
  });
  it('should return error on create Product', async () => {
    mockproductRepository.save.mockResolvedValueOnce(undefined);
    await expect(service.createProduct(undefined)).rejects.toThrow(
      HttpException,
    );
  });
  it('should return an array of products', async () => {
    const result = await service.findAll();
    expect(result).toEqual(mockProductsArray);
    expect(mockproductRepository.find).toHaveBeenCalled();
  });
  it('should return an error when database is empty', async () => {
    mockproductRepository.find.mockResolvedValueOnce(undefined);
    await expect(service.findAll()).rejects.toThrow(HttpException);
  });
});
