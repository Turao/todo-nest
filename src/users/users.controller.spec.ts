import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

class UsersServiceMock {
  static mockUserDTO: CreateUserDTO | UpdateUserDTO = {
    username: 'john wick',
    email: 'baba@yaga.com',
    password: 'babayaga',
  };
  static mockUser: User = new User(UsersServiceMock.mockUserDTO);

  async findAll(): Promise<User[]> {
    return [];
  }

  async findById(id: number): Promise<User> {
    return UsersServiceMock.mockUser;
  }

  async create(userDTO: CreateUserDTO): Promise<User> {
    return UsersServiceMock.mockUser;
  }

  async update(id: number, userDTO: UpdateUserDTO): Promise<User> {
    return UsersServiceMock.mockUser;
  }

  async delete(id: number): Promise<User> {
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
      const result: User[] = [];
      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return an user', async () => {
      const id: number = 0;
      const result: User = UsersServiceMock.mockUser;
      expect(await controller.findOne(id)).toEqual(result);
    });
  });

  describe('create', () => {
    it('should return the created users', async () => {
      const userDTO: UpdateUserDTO = UsersServiceMock.mockUserDTO;
      const result: User = UsersServiceMock.mockUser;
      expect(await controller.create(userDTO)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return the updated user', async () => {
      const id: number = 0;
      const userDTO: UpdateUserDTO = UsersServiceMock.mockUserDTO;
      const result: User = UsersServiceMock.mockUser;
      expect(await controller.update(id, userDTO)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return the removed user', async () => {
      const id: number = 0;
      const result: User = UsersServiceMock.mockUser;
      expect(await controller.remove(id)).toEqual(result);
    });
  });
});
