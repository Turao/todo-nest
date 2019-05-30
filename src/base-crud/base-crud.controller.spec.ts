import { Test, TestingModule } from '@nestjs/testing';
import { BaseCrudController } from './base-crud.controller';

describe('BaseCrud Controller', () => {
  let controller: BaseCrudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaseCrudController],
    }).compile();

    controller = module.get<BaseCrudController>(BaseCrudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
