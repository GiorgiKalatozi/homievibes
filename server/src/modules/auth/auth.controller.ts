import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dtos';
import { signInSchema, signUpSchema } from './schemas';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/signup')
  @UsePipes(new JoiValidationPipe(signUpSchema))
  @HttpCode(HttpStatus.CREATED)
  public signUp(@Body() signUpDto: SignUpDto): Promise<Tokens> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/local/signin')
  @UsePipes(new JoiValidationPipe(signInSchema))
  @HttpCode(HttpStatus.OK)
  public signIn(@Body() signInDto: SignInDto): Promise<Tokens> {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/signout')
  @HttpCode(HttpStatus.OK)
  public signOut(@Req() req: Request) {
    const user = req.user;
    return this.authService.signOut(user['sub']);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  public refreshTokens(@Req() req: Request) {
    const user = req.user;
    console.log({ user });
    return this.authService.refreshTokens(user['sub'], user['refreshToken']);
  }
}
