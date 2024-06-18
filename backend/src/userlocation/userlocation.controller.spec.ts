import { Test, TestingModule } from '@nestjs/testing';
import { UserlocationController } from './userlocation.controller';

describe('UserlocationController', () => {
  let controller: UserlocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserlocationController],
    }).compile();

    controller = module.get<UserlocationController>(UserlocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
