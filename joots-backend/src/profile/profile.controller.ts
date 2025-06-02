import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(@Req() req) {
    return this.profileService.getUserProfile(req.user.id);
  }

  @Put()
  updateProfile(@Req() req, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateUserProfile(req.user.id, dto);
  }
}
