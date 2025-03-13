import { Controller, Get, UseGuards, Param } from '@nestjs/common'; // ✅ Add `UseGuards`
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { access } from 'fs';

@Controller('users') // 👈 Route de base : /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('count')
  @UseGuards(JwtAuthGuard)
  async getUsersCount() {
    const count = await this.usersService.getUsersCount();
    return { totalUsers: count };
  }

  @Get('online')
  @UseGuards(JwtAuthGuard)
  async getOnlineUsers() {
    return await this.usersService.getOnlineUsers();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }
}
