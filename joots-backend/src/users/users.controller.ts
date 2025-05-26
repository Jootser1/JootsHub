import {
  Controller,
  Get,
  UseGuards,
  Param,
  NotFoundException,
  Patch,
  Body,
} from '@nestjs/common'; // ✅ Add `UseGuards`, `NotFoundException`, `Patch`, and `Body`
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

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
      throw new NotFoundException("Données d'authentification non trouvées");
    }
    return {
      id: user.id,
      email: user.auth.email,
      username: user.username,
      avatar: user.avatar || null,
      isAvailableForChat: user.isAvailableForChat || false,
      isOnline: user.isOnline || false,
    };
  }

  @Patch(':id/chat-preference')
  @UseGuards(JwtAuthGuard)
  async updateChatPreference(
    @Param('id') id: string,
    @Body('isAvailableForChat') isAvailableForChat: boolean
  ) {
    return this.usersService.updateChatPreference(id, isAvailableForChat);
  }

  @Get('random/available')
  @UseGuards(JwtAuthGuard)
  async getRandomAvailableUser(@CurrentUser() user: any) {
    console.log('user dans getRandomAvailableUser');
    return this.usersService.getRandomAvailableUser(user.id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  async updateUserStatus(
    @Param('id') id: string,
    @Body('isOnline') isOnline: boolean
  ) {
    return this.usersService.updateUserStatusinBDD(id, isOnline);
  }
}
