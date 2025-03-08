import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.register(email, password);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(
        loginDto.email,
        loginDto.password
      );
      return {
        success: true,
        user: result.user,
        access_token: result.access_token,
      };
    } catch {
      throw new BadRequestException('Invalid credentials');
    }
  }

  @Post('logout')
  async logout(@Body('userId') userId: string): Promise<{ message: string }> {
    return await this.authService.logout(userId);
  }
}
