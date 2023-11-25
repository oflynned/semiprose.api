import { Controller, Get } from '@nestjs/common';
import { FeatureFlagService } from './feature-flag.service';

@Controller('/feature-flags')
export class FeatureFlagController {
  constructor(private readonly featureFlagService: FeatureFlagService) {}

  @Get('/')
  getFlags() {
    return this.featureFlagService.getFlags();
  }
}
