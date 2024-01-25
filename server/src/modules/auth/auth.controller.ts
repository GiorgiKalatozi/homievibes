import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dtos';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { signUpSchema } from './schemas/sign-up.schema';
import { Tokens } from './types';
import { signInSchema } from './schemas/sign-in.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/signup')
  @UsePipes(new JoiValidationPipe(signUpSchema))
  public signUp(@Body() signUpDto: SignUpDto): Promise<Tokens> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/local/signin')
  @UsePipes(new JoiValidationPipe(signInSchema))
  public signIn(@Body() signInDto: SignInDto): Promise<Tokens> {
    return this.authService.signIn(signInDto);
  }

  @Post('/signout')
  public signOut(): void {
    this.authService.signOut();
  }

  @Post('/refresh')
  public refreshTokens(): void {
    this.authService.refreshTokens();
  }
}
