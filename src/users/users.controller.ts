import { Controller, Get, Param, Post,
  Body, Put, Delete, UseGuards, 
  Injectable, UsePipes, ValidationPipe, BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDTO } from './user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@Injectable()
export class UsersController {
  constructor(private readonly userService : UsersService) {}
  
  @Get()
  async findAll() : Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() userDto: UserDTO) {
    try{
      return await this.userService.create(userDto);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id, @Body() userDto: UserDTO) {
    try {
      return await this.userService.update(id, userDto);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    try {
      return await this.userService.delete(id);
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
