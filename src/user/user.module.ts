import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from '../entity';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [AuthenticationModule, MikroOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
