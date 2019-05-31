import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { BaseCrudController } from '../base-crud/base-crud.controller';
import { ApiUseTags } from '@nestjs/swagger';
import { ItemEntity } from './item.entity';
import { ItemsService } from './items.service';
import { CreateItemDTO } from './dto/create-item.dto';

@ApiUseTags('items')
@Controller('items')
@UsePipes(ValidationPipe)
export class ItemsController extends BaseCrudController<
  ItemEntity,
  CreateItemDTO
> {
  constructor(readonly itemsService: ItemsService) {
    super(itemsService);
  }
}
