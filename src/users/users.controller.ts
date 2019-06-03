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
@UsePipes(ValidationPipe)
@Injectable()
// @UseInterceptors(ClassSerializerInterceptor) // responsible for not exposing the user password
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body('user') userDTO: CreateUserDTO): Promise<UserEntity> {
    try {
      return this.userService.create(userDTO);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), OnlyActivateIfSelf)
  async findById(@Param('id') id: number): Promise<UserEntity> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), OnlyActivateIfSelf)
  @ApiBearerAuth()
  async update(
    @Param('id') id: number,
    @Body('user') userDTO: UpdateUserDTO,
  ): Promise<UserEntity> {
    try {
      return this.userService.update(id, userDTO);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), OnlyActivateIfSelf)
  @ApiBearerAuth()
  async remove(@Param('id') id: number): Promise<UserEntity> {
    try {
      return this.userService.delete(id);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  @Get(':id/products')
  @UseGuards(AuthGuard('jwt'), OnlyActivateIfSelf)
  @ApiBearerAuth()
  async getProducts(@Param('id') id: number) {
    try {
      const user = await this.userService.findById(id);
      return user.products;
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
