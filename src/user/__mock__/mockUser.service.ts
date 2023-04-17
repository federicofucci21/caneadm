import {
  mockOpenWeek,
  mockOrdersArray,
  mockProducts,
  mockProductsArray,
  mockUserArray,
  mockUserPost,
} from './mockUser.controller';

export const mockUserRepository = {
  save: jest.fn().mockImplementation((body) => {
    if (body.firstName === 'error') {
      return false;
    }
    return {
      id: 1,
      ...body,
    };
  }),
  find: jest.fn().mockImplementation(() => mockUserArray),
  createQueryBuilder: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  getOne: jest.fn().mockResolvedValue({ id: 1, ...mockUserPost }),
  update: jest.fn(),
};
export const mockProductOrderRepository = {
  save: jest.fn().mockResolvedValue(mockProductsArray),
};
export const mockOrderRepository = {
  save: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  leftJoinAndSelect: jest.fn().mockReturnThis(),
  getMany: jest.fn().mockResolvedValue(mockOrdersArray),
};
export const mockWeekService = {
  findOpenWeek: jest.fn().mockResolvedValue(mockOpenWeek),
};
export const mockproductRepository = {
  findOneBy: jest.fn().mockResolvedValue(mockProducts),
  update: jest.fn(),
};
