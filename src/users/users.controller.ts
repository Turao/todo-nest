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
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { UserDTO } from './user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { OnlyActivateIfSelf } from './guards/is-user.guard';

@ApiUseTags('users')
@Controller('users')
@Injectable()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() userDto: UserDTO) {
    try {
      return await this.userService.create(userDto);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
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
  async update(@Param('id') id: number, @Body() userDto: UserDTO) {
    try {
      return await this.userService.update(id, userDto);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(OnlyActivateIfSelf)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async remove(@Param('id') id: number) {
    try {
      return await this.userService.delete(id);
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
