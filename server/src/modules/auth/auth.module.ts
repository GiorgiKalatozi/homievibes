import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    LocalStrategy,
    UsersService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
    }),
  ],
})
export class AuthModule {}
