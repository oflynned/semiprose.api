import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { EnvironmentModule } from '../environment/environment.module';

@Module({
  imports: [EnvironmentModule],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
