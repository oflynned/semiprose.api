import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserGuard } from './user.guard';
import { UserController } from './user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from '../entity';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserGuard],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
