import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Injectable,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductEntity } from './product.entity';
import { ProductsService } from './products.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../users/decorators/user.decorator';
import { UserEntity } from '../users/user.entity';

@ApiUseTags('products')
@Controller('products')
@UsePipes(ValidationPipe)
@Injectable()
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async findAll(): Promise<ProductEntity[]> {
    return this.productService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @User() user: UserEntity,
    @Body('product') productDTO: CreateProductDTO,
  ): Promise<ProductEntity> {
    try {
      return this.productService.create(user, productDTO);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<ProductEntity> {
    const product = await this.productService.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: number,
    @Body('product') productDTO: UpdateProductDTO,
  ): Promise<ProductEntity> {
    try {
      return this.productService.update(id, productDTO);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: number): Promise<ProductEntity> {
    try {
      return this.productService.delete(id);
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
