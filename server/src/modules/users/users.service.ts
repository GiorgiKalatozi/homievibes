import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  public async create(user: User): Promise<User> {
    return this.usersRepository.create(user);
  }

  public async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  public async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  public async findOneWithUsername(username: string): Promise<User> {
    return await this.usersRepository.findOneWithUsername(username);
  }

  public async update(id: number, user: User): Promise<User> {
    return await this.usersRepository.update(id, user);
  }

  public async remove(id: number): Promise<void> {
    return await this.usersRepository.remove(id);
  }
}
