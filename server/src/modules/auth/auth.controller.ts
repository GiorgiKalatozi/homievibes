import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { RefreshTokenGuard } from 'src/common/guards';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dtos';
import { signInSchema, signUpSchema } from './schemas';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup')
  @UsePipes(new JoiValidationPipe(signUpSchema))
  @HttpCode(HttpStatus.CREATED)
  public signUp(@Body() signUpDto: SignUpDto): Promise<Tokens> {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('/signin')
  @UsePipes(new JoiValidationPipe(signInSchema))
  @HttpCode(HttpStatus.OK)
  public signIn(@Body() signInDto: SignInDto): Promise<Tokens> {
    return this.authService.signIn(signInDto);
  }

  @Post('/signout')
  @HttpCode(HttpStatus.OK)
  public signOut(@GetCurrentUserId() userId: string): Promise<void> {
    return this.authService.signOut(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  public refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    console.log({ refreshToken });
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
