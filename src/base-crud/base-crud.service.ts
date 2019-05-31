import { Repository, DeepPartial } from 'typeorm';

export interface IBaseCrudService<T = any> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T>;
  create(dto: DeepPartial<T>): Promise<T>;
  update(id: number, dto: DeepPartial<T>): Promise<T>;
  delete(id: number): Promise<T>;
}

export class BaseCrudService<T = any> implements IBaseCrudService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<T> {
    return this.repository.findOne(id);
  }

  async create(dto: DeepPartial<T>): Promise<T> {
    const model = await this.repository.create(dto);
    await this.repository.save(model);
    return model;
  }

  async update(id: number, dto: DeepPartial<T>): Promise<T> {
    const model = await this.repository.findOne(id);
    this.repository.merge(model, dto);
    await this.repository.save(model);
    return model;
  }

  async delete(id: number): Promise<T> {
    const model = await this.repository.findOne(id);
    return this.repository.remove(model);
  }
}
