import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  public async create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  public async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  public async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  public async findOneWithUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email: username } });
  }
  public async findOneWithEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email: email } });
  }

  public async update(id: number, user: User): Promise<User> {
    const userToUpdate = await this.usersRepository.findOne({ where: { id } });
    await this.usersRepository.update(id, user);
    return userToUpdate;
  }

  public save(user: Partial<User>): Promise<User> {
    return this.usersRepository.save(user);
  }

  public async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
