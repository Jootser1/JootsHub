import { Injectable } from '@nestjs/common';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class UserService {
  constructor(private readonly logger: AppLogger) {}

  getUser(id: number) {
    this.logger.log(`Fetching user with ID: ${id}`);
    return { id, name: 'John Doe' };
  }
}
