import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { IcebreakerService } from './icebreaker.service';

@Controller('icebreakers')
export class IcebreakerController {
  constructor(private readonly icebreakerService: IcebreakerService) {}

} 