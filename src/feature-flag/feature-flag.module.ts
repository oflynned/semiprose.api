import { Module } from '@nestjs/common';
import { SecretModule } from '../secret/secret.module';
import { FeatureFlagService } from './feature-flag.service';
import { FeatureFlagController } from './feature-flag.controller';

@Module({
  imports: [SecretModule],
  controllers: [FeatureFlagController],
  providers: [FeatureFlagService],
  exports: [FeatureFlagService],
})
export class FeatureFlagModule {}
