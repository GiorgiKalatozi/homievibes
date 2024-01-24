import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly usersService: UsersService,
  ) {}

  public async signUp(@Body() signUpDto: SignUpDto): Promise<Tokens> {
    const { email, username, password } = signUpDto;
    const hashedPassword = await this.hashData(password);
    const newUser = this.usersRepository.create({
      email,
      username,
      password: hashedPassword,
    });
    return await this.usersRepository.save(newUser);
  }

  public signIn() {}
  public signOut() {}
  public refreshTokens() {}

  private hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
}
