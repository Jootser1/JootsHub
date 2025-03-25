import { Controller, Get, UseGuards, Param, NotFoundException } from '@nestjs/common'; // ✅ Add `UseGuards` and `NotFoundException`
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
    if (!user.auth) {
      throw new NotFoundException('Données d\'authentification non trouvées');
    }
    return {
      id: user.id,
      email: user.auth.email,
      username: user.username,
    };
  }
}
