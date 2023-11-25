import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { AnalyserService } from './analyser.service';

@Controller('/analyser')
export class AnalyserController {
  constructor(private readonly analyserService: AnalyserService) {}

  @Post('/feedback')
  async requestFeedback(
    @Body() { title, paragraphs }: { title: string; paragraphs: string[] },
  ) {
    // if (!this.featureFlagService.isAnalysisEnabled()) {
    throw new NotFoundException(`Feature is not enabled`);
    // }

    // const story = await this.storyService.getStoryById('storyId');
    // const prompt = await this.promptService.getCurrentWritingPrompt();
    //
    // return this.analyserService.requestFeedback(story);
  }

  @Get('/feedback/:storyId')
  async getFeedback(@Param('storyId') storyId: string) {
    const feedback = await this.analyserService.getFeedback(storyId);

    if (feedback) {
      return feedback;
    }

    throw new NotFoundException('No feedback yet, please request it');
  }
}
