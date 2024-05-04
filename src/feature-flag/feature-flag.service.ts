import { Injectable } from '@nestjs/common';
import { SecretService } from '../secret/secret.service';

type Feature = 'ENABLE_ANALYSIS_FEATURE' | 'ENABLE_APP';

@Injectable()
export class FeatureFlagService {
  constructor(private readonly secretService: SecretService) {}

  getFlags(): Record<Feature, boolean> {
    return {
      ENABLE_ANALYSIS_FEATURE: this.isFlagEnabled('ENABLE_ANALYSIS_FEATURE'),
      ENABLE_APP: this.isFlagEnabled('ENABLE_APP'),
    };
  }

  isFlagEnabled(feature: Feature) {
    const enabled = this.secretService.getValue(feature, 'false');

    return enabled === 'true';
  }
}
