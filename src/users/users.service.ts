import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  
  async findAll() : Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number) : Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findOneByEmail(email: string) : Promise<User> {
    return await this.userRepository.findOne({
      where: { email: email }
    })
  }

  async create(userDto: UserDTO) : Promise<User> {
    return await this.userRepository.save(userDto);
  }

  async update(id: number, userDto: UserDTO) : Promise<User> {
    const user = await this.userRepository.findOne(id);
    this.userRepository.merge(user, userDto);
    return await this.userRepository.save(user);
  }

  async delete(id: number) : Promise<User> {
    const user = await this.userRepository.findOne(id);
    return await this.userRepository.remove(user);
  }
}
