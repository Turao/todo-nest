import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserDTO } from './user.dto';

class UsersServiceMock extends UsersService {
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

  async remove(id: number) {}
}

describe('Users Controller', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: User[] = [new User(), new User()];
      expect(await controller.findAll()).toBe(result);
    });
  });
});
