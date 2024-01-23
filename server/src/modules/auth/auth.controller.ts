import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/signup')
  public signUp(): void {
    this.authService.signUp();
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
