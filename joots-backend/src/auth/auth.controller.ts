import { Controller, Post, Body, BadRequestException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

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

  @Post('refresh')
  async refreshToken(@Body() body: { refresh_token: string }) {
    return this.authService.refreshToken(body.refresh_token);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Body() body: { userId: string }) {
    return this.authService.logout(body.userId);
  }
}
