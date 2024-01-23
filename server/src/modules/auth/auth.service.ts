import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly usersService: UsersService,
  ) {}

  public async signUp(@Body() signUpDto: SignUpDto) {
    const { email, username, password } = signUpDto;
    const newUser = this.usersRepository.create({
      email,
      username,
      password,
    });
    return await this.usersRepository.save(newUser);
  }

  public signIn() {}
  public signOut() {}
  public refreshTokens() {}
}
