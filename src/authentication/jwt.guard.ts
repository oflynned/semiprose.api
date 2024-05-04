import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class JwtGuard implements CanActivate {
  private readonly logger = new Logger(JwtGuard.name);

  constructor(private readonly authService: AuthenticationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const [, token] = req.headers.authorization.split(' ');
    const decodedIdToken = await this.authService.verifyJwt(token);

    this.logger.debug(`Token: ${token}`);

    if (decodedIdToken) {
      req.token = decodedIdToken;

      return true;
    }

    return false;
  }
}
