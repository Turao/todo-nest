import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Injectable,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { OnlyActivateIfSelf } from '../auth/guards/is-user.guard';

@ApiUseTags('users')
@Controller('users')
@Injectable()
@UseInterceptors(ClassSerializerInterceptor) // responsible for not exposing the user password
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() userDTO: CreateUserDTO): Promise<UserEntity> {
    try {
      return this.userService.create(userDTO);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  async findById(@Param('id') id: number): Promise<UserEntity> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(OnlyActivateIfSelf)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async update(
    @Param('id') id: number,
    @Body() userDTO: UpdateUserDTO,
  ): Promise<UserEntity> {
    try {
      return this.userService.update(id, userDTO);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(OnlyActivateIfSelf)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async remove(@Param('id') id: number): Promise<UserEntity> {
    try {
      return this.userService.delete(id);
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
