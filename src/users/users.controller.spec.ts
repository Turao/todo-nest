import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

class UsersServiceMock {
  static mockUserDTO: CreateUserDTO | UpdateUserDTO = {
    username: 'john wick',
    email: 'baba@yaga.com',
    password: 'babayaga',
  };
  static mockUser: UserEntity = new UserEntity(UsersServiceMock.mockUserDTO);

  async findAll(): Promise<UserEntity[]> {
    return [];
  }

  async findById(id: number): Promise<UserEntity> {
    return UsersServiceMock.mockUser;
  }

  async create(userDTO: CreateUserDTO): Promise<UserEntity> {
    return UsersServiceMock.mockUser;
  }

  async update(id: number, userDTO: UpdateUserDTO): Promise<UserEntity> {
    return UsersServiceMock.mockUser;
  }

  async delete(id: number): Promise<UserEntity> {
    return UsersServiceMock.mockUser;
  }
}

describe('Users Controller', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(new UsersServiceMock())
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: UserEntity[] = [];
      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return an user', async () => {
      const id: number = 0;
      const result: UserEntity = UsersServiceMock.mockUser;
      expect(await controller.findOne(id)).toEqual(result);
    });
  });

  describe('create', () => {
    it('should return the created users', async () => {
      const userDTO: UpdateUserDTO = UsersServiceMock.mockUserDTO;
      const result: UserEntity = UsersServiceMock.mockUser;
      expect(await controller.create(userDTO)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return the updated user', async () => {
      const id: number = 0;
      const userDTO: UpdateUserDTO = UsersServiceMock.mockUserDTO;
      const result: UserEntity = UsersServiceMock.mockUser;
      expect(await controller.update(id, userDTO)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return the removed user', async () => {
      const id: number = 0;
      const result: UserEntity = UsersServiceMock.mockUser;
      expect(await controller.remove(id)).toEqual(result);
    });
  });
});
