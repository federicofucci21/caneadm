import {
  mockOpenWeek,
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
};
export const mockWeekService = {
  findOpenWeek: jest.fn().mockResolvedValue(mockOpenWeek),
};
export const mockproductRepository = {
  findOneBy: jest.fn().mockResolvedValue(mockProducts),
  update: jest.fn(),
};

//   const mockCreateQueryBuilder = () => ({
//     select: jest.fn().mockReturnThis(),
//     from: jest.fn().mockReturnThis(),
//     where: jest.fn().mockReturnThis(),
//     andWhere: jest.fn().mockReturnThis(),
//     orderBy: jest.fn().mockReturnThis(),
//     limit: jest.fn().mockReturnThis(),
//     offset: jest.fn().mockReturnThis(),
//     getMany: jest.fn().mockReturnValue([]),
//     getOne: jest.fn().mockReturnValue(mockUserPost),
//   });
