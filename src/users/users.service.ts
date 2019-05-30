import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserCredentialsDTO } from './dto/user-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }

  async findByCredentials(
    credentials: UserCredentialsDTO,
  ): Promise<User | undefined> {
    let user = await this.userRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email: credentials.email },
    });
    const isValidPassword = await bcrypt.compare(
      credentials.password,
      user.password,
    );

    delete user.password; // never expose the password
    return isValidPassword ? user : undefined;
  }

  async create(userDto: CreateUserDTO): Promise<User> {
    const user = await this.userRepository.create(userDto);
    await this.userRepository.save(user);
    delete user.password;
    return user;
  }

  async update(id: number, userDto: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findOne(id, {
      select: ['id', 'email', 'username', 'password'],
    });
    this.userRepository.merge(user, userDto);
    await this.userRepository.save(user);
    delete user.password;
    return user;
  }

  async delete(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    return this.userRepository.remove(user);
  }
}
