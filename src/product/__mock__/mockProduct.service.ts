import { mockProduct, mockProductsArray } from './mockProduct.controller';

export const mockproductRepository = {
  save: jest.fn().mockResolvedValue({ id: 1, ...mockProduct }),
  find: jest.fn().mockResolvedValue(mockProductsArray),
  findOneBy: jest.fn().mockResolvedValue(mockProduct),
  update: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  getOne: jest.fn().mockResolvedValue({ id: 1, ...mockProduct }),
};
