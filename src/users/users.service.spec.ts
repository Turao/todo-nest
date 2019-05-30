import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';

// mock user repository to avoid database connections
class UserRepositoryMock {}

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: new UserRepositoryMock(),
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });
});
