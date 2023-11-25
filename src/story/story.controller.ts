import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { StoryService } from './story.service';
import { Story } from '../analyser/content';
import { StoryState } from './types';

@Controller('/stories')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post('/')
  createStory(@Body() story: Story) {
    return story;
  }

  @Post('/draft')
  createDraft(@Body() draft: Story) {
    return draft;
  }

  @Get('/')
  getStories(@Query('state') state: StoryState) {
    return [];
  }

  @Get('/:storyId')
  getStoryById(@Param('storyId') storyId: string) {
    return null;
  }
}
