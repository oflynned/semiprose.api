import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log(request);

    throw new Error('Method not implemented.');
  }
}
