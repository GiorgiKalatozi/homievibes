import { Body, Controller, Post, UsePipes } from '@nestjs/common';
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
