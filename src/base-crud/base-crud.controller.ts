import {
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Injectable,
} from '@nestjs/common';
import { IBaseCrudService } from './base-crud.service';

export interface IBaseCrudController<T = any> {
  findAll(): Promise<T[]>;
  findById(id: any): Promise<T>;
  create(dto: any): Promise<T>;
  update(id: any, dto: any): Promise<T>;
  remove(id: any): Promise<T>;
}

@Injectable()
export class BaseCrudController<T = any> implements IBaseCrudController<T> {
  constructor(private readonly service: IBaseCrudService) {}

  @Get()
  async findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: any): Promise<T> {
    return this.service.findById(id);
  }

  @Post()
  async create(@Body() dto: any): Promise<T> {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: any, @Body() dto: any): Promise<T> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: any): Promise<T> {
    return this.service.delete(id);
  }
}
