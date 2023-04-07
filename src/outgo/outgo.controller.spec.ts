import { Test, TestingModule } from '@nestjs/testing';
import { WeekEntity } from '../week/entities/week.entity';
import { OutgoDTO } from './dto/outgo.dto';
import { OutgoController } from './outgo.controller';
import { OutgoService } from './outgo.service';

// import httpMocks from 'node-mocks-http';

describe('OutgoController', () => {
  const mockOutgoService = {
    createOutgo: jest.fn().mockImplementation((body: OutgoDTO) => {
      return {
        id: 1,
        ...body,
      };
    }),
    findOutgoes: jest.fn().mockImplementation(() => mockOutgoArray),
  };
  const mockOutgoArray: OutgoDTO[] = [
    {
      amount: 10,
      detail: 'hola',
      date: new Date(),
      week: new WeekEntity(),
    },
    {
      amount: 10,
      detail: 'hola',
      date: new Date(),
      week: new WeekEntity(),
    },
    {
      amount: 10,
      detail: 'hola',
      date: new Date(),
      week: new WeekEntity(),
    },
  ];

  const mockOutgoPost = {
    amount: 10,
    detail: 'hola',
    date: new Date(),
    week: new WeekEntity(),
  };

  let controller: OutgoController;
  // let service: OutgoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [OutgoController],
      providers: [OutgoService],
    })
      .overrideProvider(OutgoService)
      .useValue(mockOutgoService)
      .compile();

    controller = module.get<OutgoController>(OutgoController);
    // service = module.get<OutgoService>(OutgoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create an outgo', async () => {
    expect(await controller.createOutgo(mockOutgoPost)).toEqual({
      id: expect.any(Number),
      ...mockOutgoPost,
    });
  });
  it('should find All outgo', async () => {
    expect(await controller.getAllOurgoes()).toHaveLength(3);
  });
});
