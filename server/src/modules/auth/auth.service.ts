import { Body, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { SignInDto, SignUpDto } from './dtos';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
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

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.usersRepository.save(newUser);
    await this.updateRefreshToken(newUser.id, tokens.refresh_token);
    return tokens;
  }

  public async signIn(signInDto: SignInDto): Promise<Tokens> {
    const { email, password } = signInDto;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) throw new ForbiddenException('Access Denied.');

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied.');

    const tokens = await this.getTokens(user.id, user.email);
    await this.usersRepository.save(user);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  public async signOut(userId: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    user.refreshToken = null;

    await this.usersRepository.save(user);
  }
  public async refreshTokens(
    userId: number,
    refreshToken: string,
  ): Promise<Tokens> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new ForbiddenException('Access Denied.');
    }

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied.');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  private hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  private async getTokens(userId: number, email: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const hash = await this.hashData(refreshToken);

    const user = await this.usersRepository.findOne({ where: { id: userId } });

    user.refreshToken = hash;

    await this.usersRepository.save(user);
  }
}
