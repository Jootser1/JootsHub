import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    return this.authService.register(email, password);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log('loginDto', loginDto);
    try {
      const result = await this.authService.login(
        loginDto.email,
        loginDto.password
      );
      console.log('Connexion réussie pour:', loginDto.email);
      return {
        success: true,
        user: result.user,
        access_token: result.access_token,
      };
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw new BadRequestException(error.message || 'Invalid credentials');
    }
  }

  @Post('logout')
  async logout(@Body() body: { userId: string }) {
    return this.authService.logout(body.userId);
  }
}
