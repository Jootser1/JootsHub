import { Controller, Get, UseGuards } from '@nestjs/common'; // ✅ Add `UseGuards`
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users') // 👈 Route de base : /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('count')
  async getUsersCount() {
    const count = await this.usersService.getUsersCount();
    return { totalUsers: count };
  }
}
