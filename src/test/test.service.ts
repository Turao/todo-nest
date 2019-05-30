import { BaseCrudService } from '../base-crud/base-crud.service';
import { TestEntity } from './test.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class TestService extends BaseCrudService<TestEntity> {
  constructor(
    @InjectRepository(TestEntity)
    readonly testRepository: Repository<TestEntity>,
  ) {
    super(testRepository);
  }
}
