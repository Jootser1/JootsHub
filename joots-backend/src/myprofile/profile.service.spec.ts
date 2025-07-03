import { Test, TestingModule } from '@nestjs/testing';
import { MyProfileService } from './profile.service';

describe('MyProfileService', () => {
  let service: MyProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyProfileService],
    }).compile();

    service = module.get<MyProfileService>(MyProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
