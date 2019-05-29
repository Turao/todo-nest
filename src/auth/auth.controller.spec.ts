import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserCredentialsDTO } from '../users/user.dto';
import { UsersModule } from '../users/users.module';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      controllers: [AuthController],
      providers: [AuthService, JwtStrategy],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should return a json web token', async () => {
    const credentials: UserCredentialsDTO = {
      email: 'john@doe.com',
      password: 'password',
    };
    expect(await controller.logIn(credentials)).toReturn();
  });
});
