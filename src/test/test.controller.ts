import { Controller } from '@nestjs/common';
import { BaseCrudController } from '../base-crud/base-crud.controller';
import { ApiUseTags } from '@nestjs/swagger';
import { TestEntity } from './test.entity';
import { TestService } from './test.service';

@ApiUseTags('test')
@Controller('test')
export class TestController extends BaseCrudController<TestEntity> {
  constructor(readonly testService: TestService) {
    super(testService);
  }
}
