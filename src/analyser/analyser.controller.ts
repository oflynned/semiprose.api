import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { AnalyserService } from './analyser.service';
import { FeatureFlagService } from '../feature-flag/feature-flag.service';
import { UserEntity } from '../entity';
import { User } from '../decorators/user.decorator';

@Controller('/analyser')
export class AnalyserController {
  constructor(
    private readonly analyserService: AnalyserService,
    private readonly featureFlagService: FeatureFlagService,
  ) {}

  @Post('/feedback')
  async requestFeedback(
    @Body() { draftId }: { draftId: string },
    @User() user: UserEntity,
  ) {
    if (!this.featureFlagService.isFlagEnabled('ENABLE_ANALYSIS_FEATURE')) {
      throw new NotFoundException(`Feature is not enabled`);
    }

    return this.analyserService.requestFeedback(draftId, user);
  }

  @Get('/feedback/draft/:draftId')
  async getFeedback(
    @Param('draftId') draftId: string,
    @User() user: UserEntity,
  ) {
    const feedback = await this.analyserService.getFeedback(draftId, user);

    if (feedback) {
      return feedback;
    }

    throw new NotFoundException('No feedback yet, please request it');
  }
}
