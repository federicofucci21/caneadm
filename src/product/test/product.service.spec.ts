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
  //Create Product
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
  //Find All products
  it('should return an array of products', async () => {
    const result = await service.findAll();
    expect(result).toEqual(mockProductsArray);
    expect(mockproductRepository.find).toHaveBeenCalled();
  });
  it('should return an error when database is empty', async () => {
    mockproductRepository.find.mockResolvedValueOnce(undefined);
    await expect(service.findAll()).rejects.toThrow(HttpException);
  });
  //Found product by ID
  it('should return a product found by ID', async () => {
    const result = await service.findOneById(1);
    expect(result).toEqual({ id: expect.any(Number), ...mockProduct });
    expect(mockproductRepository.createQueryBuilder).toHaveBeenCalledTimes(1);
    expect(mockproductRepository.where).toHaveBeenCalledTimes(1);
    expect(mockproductRepository.where).toHaveBeenCalledWith({
      id: expect.any(Number),
    });
    expect(mockproductRepository.getOne).toHaveBeenCalledTimes(1);
  });
  it('should return an error if product do not found', async () => {
    mockproductRepository.getOne.mockResolvedValueOnce(undefined);
    await expect(service.findOneById(1)).rejects.toThrow(HttpException);
  });
  //delete Product
  it('should delete a product', async () => {
    mockproductRepository.update.mockResolvedValueOnce({ affected: 1 });
    const result = await service.deleteProduct(1);
    expect(result).toEqual({ id: 1, ...mockProduct });
    expect(mockproductRepository.update).toHaveBeenCalled();
    expect(mockproductRepository.createQueryBuilder).toHaveBeenCalled();
    expect(mockproductRepository.where).toHaveBeenCalledWith({ id: 1 });
    expect(mockproductRepository.getOne).toHaveBeenCalled();
  });
  it('should return an error if fail on delete user', async () => {
    mockproductRepository.update.mockResolvedValueOnce({ affected: 0 });
    await expect(service.deleteProduct(1)).rejects.toThrow(HttpException);
  });
  //Update Product
  it('should update product', async () => {
    mockproductRepository.update.mockResolvedValueOnce({ affected: 1 });
    const result = await service.updateProduct(1, mockProduct);
    expect(result).toEqual({ id: 1, ...mockProduct });
    expect(mockproductRepository.update).toHaveBeenCalledWith(1, mockProduct);
    expect(mockproductRepository.createQueryBuilder).toHaveBeenCalled();
    expect(mockproductRepository.where).toHaveBeenCalledWith({ id: 1 });
    expect(mockproductRepository.getOne).toHaveBeenCalled();
  });
  it('should return an error on failing updating product', async () => {
    mockproductRepository.update.mockResolvedValueOnce({ affected: 0 });
    await expect(service.updateProduct(1, mockProduct)).rejects.toThrow(
      HttpException,
    );
  });
});
