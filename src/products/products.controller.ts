import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { BaseCrudController } from '../base-crud/base-crud.controller';
import { ApiUseTags } from '@nestjs/swagger';
import { ProductEntity } from './product.entity';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@ApiUseTags('products')
@Controller('products')
@UsePipes(ValidationPipe)
export class ProductsController extends BaseCrudController<
  ProductEntity,
  CreateProductDTO,
  UpdateProductDTO
> {
  constructor(readonly productsService: ProductsService) {
    super(productsService);
  }
}
