import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async findById(id: number): Promise<ProductEntity> {
    return this.productRepository.findOne(id, { relations: ['owner'] });
  }

  async create(
    user: UserEntity,
    productDTO: CreateProductDTO,
  ): Promise<ProductEntity> {
    const product = await this.productRepository.create(productDTO);
    product.owner = user;
    await this.productRepository.save(product);
    return product;
  }

  async update(
    id: number,
    productDTO: UpdateProductDTO,
  ): Promise<ProductEntity> {
    const product = await this.productRepository.findOne(id);
    this.productRepository.merge(product, productDTO);
    await this.productRepository.save(product);
    return product;
  }

  async delete(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne(id);
    return this.productRepository.remove(product);
  }
}
