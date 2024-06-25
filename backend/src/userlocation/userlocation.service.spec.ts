import { Test, TestingModule } from '@nestjs/testing';
import { UserlocationService } from './userlocation.service';

describe('UserlocationService', () => {
  let service: UserlocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserlocationService],
    }).compile();

    service = module.get<UserlocationService>(UserlocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
