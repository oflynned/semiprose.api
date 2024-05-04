import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { JwtGuard } from '../authentication/jwt.guard';
import { UserGuard } from '../authentication/user.guard';
import { DecodedToken } from '../decorators/jwt.decorator';
import { UserEntity } from '../entity';
import { auth } from 'firebase-admin';

import DecodedIdToken = auth.DecodedIdToken;
import { toType } from './user.type';

@UseGuards(JwtGuard)
@Controller('/users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('/')
  async createUser(
    @Body() dto: CreateUserDto,
    @DecodedToken() token: DecodedIdToken,
  ) {
    this.logger.log('Creating a new user');
    this.logger.debug(JSON.stringify(dto));

    const existingUser = await this.userService.getByEmail(token.email);

    if (existingUser) {
      this.logger.warn('User already exists');

      return toType(existingUser);
    }

    const user = await this.userService.createUser({
      username: dto.username,
      firebaseId: token.uid,
      email: token.email,
      authenticationMethod: token.firebase.sign_in_provider,
    });

    if (user) {
      this.logger.log('User created');

      return toType(user);
    }

    this.logger.error('Invalid user data');

    throw new BadRequestException('Invalid user data');
  }

  @Get('/me')
  @UseGuards(UserGuard)
  async getMe(@Request() req: Request & { user: UserEntity }) {
    return toType(req.user);
  }

  @Get('/:id')
  @UseGuards(UserGuard)
  async getUser(@Param('id') id: string) {
    const user = await this.userService.getById(id);

    if (user) {
      return toType(user);
    }

    throw new BadRequestException('User not found');
  }
}
