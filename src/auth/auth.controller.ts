import {
  Controller,
  Post,
  Injectable,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDTO, UserCredentialsDTO } from '../users/user.dto';

@ApiUseTags('auth')
@Controller('auth')
@Injectable()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: UserCredentialsDTO) {
    return this.authService.login(credentials);
  }

  @Post('signup')
  async signup(@Body() userDTO: UserDTO) {
    try {
      return this.authService.signup(userDTO);
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
