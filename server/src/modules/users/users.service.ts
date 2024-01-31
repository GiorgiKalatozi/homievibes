import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async create(user: User): Promise<User> {
    return this.usersRepository.create(user);
  }

  public async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  public async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  public async findOneWithUsername(username: string): Promise<User> {
    return await this.usersRepository.findOneWithUsername(username);
  }

  public async update(id: string, user: User): Promise<User> {
    const userToUpdate = await this.usersRepository.update(id, user);
    if (!userToUpdate) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return userToUpdate;
  }

  public async remove(id: string): Promise<void> {
    return await this.usersRepository.remove(id);
  }
}
