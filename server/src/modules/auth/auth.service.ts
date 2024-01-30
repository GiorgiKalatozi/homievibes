import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/repositories/users.repository';
import { SignInDto, SignUpDto } from './dtos';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async signUp(signUpDto: SignUpDto): Promise<Tokens> {
    const { email, username, password } = signUpDto;
    const hashedPassword = await this.hashData(password);
    const newUser = await this.usersRepository.create({
      email,
      username,
      password: hashedPassword,
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser.id, tokens.refresh_token);
    return tokens;
  }

  public async signIn(signInDto: SignInDto): Promise<Tokens> {
    const { email, password } = signInDto;
    const user = await this.usersRepository.findOneWithEmail(email);

    if (!user) throw new ForbiddenException('Access Denied.');

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied.');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  public async signOut(userId: string): Promise<void> {
    const user = await this.usersRepository.findOne(userId);

    user.refreshToken = null;

    await this.usersRepository.save(user);
  }
  public async refreshTokens(
    userId: string,
    refreshToken: string,
  ): Promise<Tokens> {
    const user = await this.usersRepository.findOne(userId);

    if (!user || !user.refreshToken) {
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

  private async getTokens(userId: string, email: string): Promise<Tokens> {
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
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const hash = await this.hashData(refreshToken);

    const user = await this.usersRepository.findOne(userId);

    user.refreshToken = hash;

    await this.usersRepository.save(user);
  }
}
