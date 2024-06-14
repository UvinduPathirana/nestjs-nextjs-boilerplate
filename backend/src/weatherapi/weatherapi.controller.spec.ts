import { Test, TestingModule } from '@nestjs/testing';
import { WeatherapiController } from './weatherapi.controller';

describe('WeatherapiController', () => {
  let controller: WeatherapiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherapiController],
    }).compile();

    controller = module.get<WeatherapiController>(WeatherapiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
