import { Injectable } from '@nestjs/common';
import { SecretService } from '../secret/secret.service';

type Feature = 'ENABLE_ANALYSIS_FEATURE';

@Injectable()
export class FeatureFlagService {
  constructor(private readonly secretService: SecretService) {}

  getFlags(): Record<Feature, boolean> {
    return {
      ENABLE_ANALYSIS_FEATURE: this.isAnalysisEnabled(),
    };
  }

  isFlagEnabled(feature: Feature) {
    const enabled = this.secretService.getValue(feature, 'false');

    return enabled.ok ? enabled.val === 'true' : false;
  }

  isAnalysisEnabled() {
    return this.isFlagEnabled('ENABLE_ANALYSIS_FEATURE');
  }
}
