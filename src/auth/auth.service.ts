import { JwtService } from '@nestjs/jwt';
import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { UserCredentialsDTO } from '../users/dto/user-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtResponse } from './interfaces/jwt-response.interface';
import { classToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(userDTO: CreateUserDTO): Promise<JwtResponse> {
    let user = await this.usersService.create(userDTO);
    // sign expects payload as plain object
    //! use classToPlain so class-transformer can exclude the user's password
    const token = this.jwtService.sign(classToPlain(user));
    return { token };
  }

  async login(credentials: UserCredentialsDTO): Promise<JwtResponse> {
    let user = await this.usersService.findByCredentials(credentials);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    // sign expects payload as plain object
    //! use classToPlain so class-transformer can exclude the user's password
    const token = this.jwtService.sign(classToPlain(user));
    return { token };
  }

  async validateUser(user: JwtPayload): Promise<any> {
    return this.usersService.findById(user.id);
  }
}
