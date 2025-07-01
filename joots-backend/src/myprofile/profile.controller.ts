import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { MyProfileService } from './profile.service';
import { UpdateMyProfileDto } from './dto/update-myprofile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('myprofile')
@UseGuards(JwtAuthGuard)
export class MyProfileController {
  constructor(private readonly myProfileService: MyProfileService) {}

  @Get()
  getMyProfile(@Req() req) {
    return this.myProfileService.getMyProfile(req.user.id);
  }

  @Put()
  updateMyProfile(@Req() req, @Body() dto: UpdateMyProfileDto) {
    return this.myProfileService.updateMyProfile(req.user.id, dto);
  }

}
