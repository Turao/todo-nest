import {
  Controller,
  Post,
  Injectable,
  BadRequestException,
  Body,
  Res,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { UserCredentialsDTO } from '../users/dto/user-credentials.dto';
import { Response } from 'express';

@ApiUseTags('auth')
@Controller('auth')
@Injectable()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: UserCredentialsDTO, @Res() res: Response) {
    const token = await this.authService.login(credentials);
    res.cookie('access_token', token, {
      httpOnly: true,
    });
    res.status(200).send({ success: true });
  }

  @Post('signup')
  async signup(@Body() userDTO: CreateUserDTO, @Res() res: Response) {
    try {
      const token = await this.authService.signup(userDTO);
      res.cookie('access_token', token, {
        httpOnly: true,
      });
      res.status(201).send({ success: true });
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
