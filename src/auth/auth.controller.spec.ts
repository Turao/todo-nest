import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserCredentialsDTO } from '../users/dto/user-credentials.dto';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtResponse } from './interfaces/jwt-response.interface';

export class AuthServiceMock {
  async login(credentials: UserCredentialsDTO): Promise<JwtResponse> {
    return { token: 'token' };
  }

  async signup(userDTO: CreateUserDTO): Promise<JwtResponse> {
    return { token: 'token' };
  }
}

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: 'secret',
          signOptions: {
            expiresIn: 3600,
          },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, JwtStrategy],
    })
      .overrideProvider(AuthService)
      .useValue(new AuthServiceMock())
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should return a json web token', async () => {
      const credentials: UserCredentialsDTO = {
        email: 'john@doe.com',
        password: 'password',
      };
      const result: JwtResponse = {
        token: 'token',
      };
      expect(await controller.login(credentials)).toEqual(result);
    });
  });

  describe('signup', () => {
    it('should return a json web token', async () => {
      const userDTO: CreateUserDTO = {
        username: 'username',
        email: 'email@domain.com',
        password: 'password',
      };
      const result: JwtResponse = {
        token: 'token',
      };
      expect(await controller.signup(userDTO)).toEqual(result);
    });
  });
});
