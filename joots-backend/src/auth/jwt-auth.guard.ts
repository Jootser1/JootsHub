import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    interface AuthenticatedRequest extends Request {
      user?: any;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers['authorization'] as string | undefined;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }
    try {
      const token = authHeader.split(' ')[1];
      const decoded = this.jwtService.verify<{ [key: string]: any }>(token);
      request.user = decoded; // Ajoute `user` à `request`
      return true;
    } catch {
      return false;
    }
  }
}
