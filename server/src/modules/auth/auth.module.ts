import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/repositories/users.repository';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    UsersService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    UsersRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      // secret: `${process.env.JWT_SECRET}`,
      // signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
    }),
  ],
})
export class AuthModule {}
