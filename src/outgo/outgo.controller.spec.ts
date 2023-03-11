import { Test, TestingModule } from '@nestjs/testing';
import { OutgoController } from './outgo.controller';

xdescribe('OutgoController', () => {
  let controller: OutgoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutgoController],
    }).compile();

    controller = module.get<OutgoController>(OutgoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
