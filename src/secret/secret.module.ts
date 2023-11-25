import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SecretService } from './secret.service';

@Module({
  imports: [ConfigModule],
  providers: [SecretService],
  exports: [SecretService],
})
export class SecretModule {}
