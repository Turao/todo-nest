import {
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { IBaseCrudService } from './base-crud.service';
import { DeepPartial } from 'typeorm';

export interface IBaseCrudController<T = any, C = any> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T>;
  create(createDTO: C): Promise<T>;
  update(id: number, updateDTO: DeepPartial<T>): Promise<T>;
  remove(id: number): Promise<T>;
}

@Injectable()
export class BaseCrudController<T = any, C = any>
  implements IBaseCrudController<T, C> {
  constructor(private readonly service: IBaseCrudService) {}

  @Get()
  async findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<T> {
    const resource = await this.service.findById(id);
    if (!resource) {
      throw new NotFoundException();
    }
    return resource;
  }

  @Post()
  async create(@Body() createDTO: C): Promise<T> {
    try {
      return this.service.create(createDTO);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDTO: DeepPartial<T>,
  ): Promise<T> {
    try {
      return this.service.update(id, updateDTO);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<T> {
    try {
      return this.service.delete(id);
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
