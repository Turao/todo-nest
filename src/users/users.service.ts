import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserCredentialsDTO } from './dto/user-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<UserEntity | undefined> {
    return this.userRepository.findOne(id);
  }

  async findByCredentials(
    credentials: UserCredentialsDTO,
  ): Promise<UserEntity | undefined> {
    let user = await this.userRepository.findOne({
      where: { email: credentials.email },
    });
    const isValidPassword = await bcrypt.compare(
      credentials.password,
      user.password,
    );

    return isValidPassword ? user : undefined;
  }

  async create(userDTO: CreateUserDTO): Promise<UserEntity> {
    const user = await this.userRepository.create(userDTO);
    await this.userRepository.save(user);
    return user;
  }

  async update(id: number, userDTO: UpdateUserDTO): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    this.userRepository.merge(user, userDTO);
    await this.userRepository.save(user);
    return user;
  }

  async delete(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    return this.userRepository.remove(user);
  }
}
