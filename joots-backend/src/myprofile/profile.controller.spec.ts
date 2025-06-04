import { Test, TestingModule } from '@nestjs/testing';
import { MyProfileController } from './profile.controller';

describe('MyProfileController', () => {
  let controller: MyProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyProfileController],
    }).compile();

    controller = module.get<MyProfileController>(MyProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
