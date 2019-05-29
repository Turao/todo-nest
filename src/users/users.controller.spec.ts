import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserDTO } from './user.dto';

class UsersServiceMock {
  async findAll(): Promise<User[]> {
    return [];
  }

  async findOne(id: number): Promise<User> {
    return new User();
  }

  async create(userDto: UserDTO): Promise<User> {
    return new User();
  }

  async update(id: number, userDto: UserDTO): Promise<User> {
    return new User();
  }

  async delete(id: number): Promise<User> {
    return new User();
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
      const result: User = new User();
      expect(await controller.findOne(id)).toEqual(result);
    });
  });

  describe('create', () => {
    it('should return the created users', async () => {
      const userDto: UserDTO = {
        username: 'username',
        email: 'email@domain.com',
        password: 'password',
      };
      const result: User = new User();
      expect(await controller.create(userDto)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return the updated user', async () => {
      const id: number = 0;
      const newUserDto: UserDTO = {
        username: 'username',
        email: 'email@domain.com',
        password: 'password',
      };
      const result: User = new User();
      expect(await controller.update(id, newUserDto)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return the removed user', async () => {
      const id: number = 0;
      const result: User = new User();
      expect(await controller.remove(id)).toEqual(result);
    });
  });
});
