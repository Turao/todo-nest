import { JwtService } from '@nestjs/jwt';
import { Injectable, BadRequestException, Body } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserCredentialsDTO, UserDTO } from '../users/user.dto';
import { JwtResponse } from './interfaces/jwt-response.interface';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(userDTO: UserDTO) : Promise<JwtResponse> {
    let user = await this.usersService.create(userDTO);
    
    user = Object.assign({}, user); // jwt sign needs a plain js object
    delete user.password
    const token = this.jwtService.sign(user);
    return { user, token };
  }

  async login(credentials: UserCredentialsDTO) : Promise<JwtResponse> {
    let user = await this.usersService.findOneByEmail(credentials.email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const isValid = await bcrypt.compare(credentials.password, user.password);
    if (!isValid) {
      throw new BadRequestException('Invalid credentials');
    }
    user = Object.assign({}, user); // jwt sign needs a plain js object
    delete user.password;
    const token = this.jwtService.sign(user);
    return { user, token }; 
  }
}
