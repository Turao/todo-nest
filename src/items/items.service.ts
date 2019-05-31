import { BaseCrudService } from '../base-crud/base-crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemEntity } from './item.entity';

export class ItemsService extends BaseCrudService<ItemEntity> {
  constructor(
    @InjectRepository(ItemEntity)
    readonly itemsRepository: Repository<ItemEntity>,
  ) {
    super(itemsRepository);
  }
}
