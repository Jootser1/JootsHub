import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    interface AuthenticatedRequest extends Request {
      user?: {
        sub: string;
        id: string;
      };
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers['authorization'] as string | undefined;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    try {
      const token = authHeader.split(' ')[1];
      // Le token est déjà vérifié par Next-Auth, on peut le décoder directement
      const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      request.user = {
        sub: decoded.sub,
        id: decoded.sub // Next-Auth utilise 'sub' comme ID d'utilisateur
      };
      return true;
    } catch {
      return false;
    }
  }
}
