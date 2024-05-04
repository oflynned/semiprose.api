import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { auth } from 'firebase-admin';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.token as auth.DecodedIdToken;

    if (!token) {
      return false;
    }

    const user = await this.userService.getByFirebaseUid(token.uid);

    if (user) {
      req.user = user;

      return true;
    }

    return false;
  }
}
