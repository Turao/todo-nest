import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductEntity } from './product.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

class ProductsServiceMock {
  static mockProductDTO: CreateProductDTO | UpdateProductDTO = {
    title: 'mock title',
    content: 'mock content',
  };
  static mockProduct: ProductEntity = new ProductEntity(
    ProductsServiceMock.mockProductDTO,
  );

  async findAll(): Promise<ProductEntity[]> {
    return [];
  }

  async findById(id: number): Promise<ProductEntity> {
    return ProductsServiceMock.mockProduct;
  }

  async create(productDTO: CreateProductDTO): Promise<ProductEntity> {
    return ProductsServiceMock.mockProduct;
  }

  async update(
    id: number,
    productDTO: UpdateProductDTO,
  ): Promise<ProductEntity> {
    return ProductsServiceMock.mockProduct;
  }

  async delete(id: number): Promise<ProductEntity> {
    return ProductsServiceMock.mockProduct;
  }
}

describe('Products Controller', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    })
      .overrideProvider(ProductsService)
      .useValue(new ProductsServiceMock())
      .compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result: ProductEntity[] = [];
      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return an product', async () => {
      const id: number = 0;
      const result: ProductEntity = ProductsServiceMock.mockProduct;
      expect(await controller.findById(id)).toEqual(result);
    });
  });

  describe('create', () => {
    it('should return the created products', async () => {
      const productDTO: UpdateProductDTO = ProductsServiceMock.mockProductDTO;
      const result: ProductEntity = ProductsServiceMock.mockProduct;
      expect(await controller.create(productDTO)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return the updated product', async () => {
      const id: number = 0;
      const productDTO: UpdateProductDTO = ProductsServiceMock.mockProductDTO;
      const result: ProductEntity = ProductsServiceMock.mockProduct;
      expect(await controller.update(id, productDTO)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return the removed product', async () => {
      const id: number = 0;
      const result: ProductEntity = ProductsServiceMock.mockProduct;
      expect(await controller.remove(id)).toEqual(result);
    });
  });
});
