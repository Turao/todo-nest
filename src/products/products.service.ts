import { BaseCrudService } from '../base-crud/base-crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';

export class ProductsService extends BaseCrudService<ProductEntity> {
  constructor(
    @InjectRepository(ProductEntity)
    readonly productsRepository: Repository<ProductEntity>,
  ) {
    super(productsRepository);
  }
}
