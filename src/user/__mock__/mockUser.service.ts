import { mockUserArray } from './mockUser.controller';

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
  getOne: jest.fn(),
};
export const mockProductOrderRepository = {};
export const mockOrderRepository = {};
export const mockWeekService = {};
export const mockproductRepository = {};

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
