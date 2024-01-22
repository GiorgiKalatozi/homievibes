import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneWithUsername(username);

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (user && passwordsMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  public async signIn(user: User) {
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
        email: user.email,
      },
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
