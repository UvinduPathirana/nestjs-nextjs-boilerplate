import { Test, TestingModule } from '@nestjs/testing';
import { WeatherapiService } from './weatherapi.service';

describe('WeatherapiService', () => {
  let service: WeatherapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherapiService],
    }).compile();

    service = module.get<WeatherapiService>(WeatherapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
