import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { signUpSchema } from './schemas/sign-up.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/signup')
  @UsePipes(new JoiValidationPipe(signUpSchema))
  public signUp(@Body() signUpDto: SignUpDto): void {
    this.authService.signUp(signUpDto);
  }
  @Post('/local/signin')
  public signIn(): void {
    this.authService.signIn();
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
