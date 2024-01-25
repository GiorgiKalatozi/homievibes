import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserId } from 'src/common/decorators';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/common/guards';
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

  @UseGuards(AccessTokenGuard)
  @Post('/signout')
  @HttpCode(HttpStatus.OK)
  public async signOut(@GetCurrentUserId() userId: number): Promise<void> {
    return await this.authService.signOut(userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  public refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
