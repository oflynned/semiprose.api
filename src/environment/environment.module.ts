import { Module } from '@nestjs/common';
import { SecretModule } from '../secret/secret.module';
import { EnvironmentService } from './environment.service';

@Module({
  imports: [SecretModule],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
