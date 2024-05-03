import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StoryService } from './story.service';
import { DraftService } from '../draft/draft.service';
import { User } from '../decorators/user.decorator';
import { UserEntity } from '../entity';
import { PublishStoryDto } from './dto/publish-story.dto';

@Controller('/stories')
export class StoryController {
  constructor(
    private readonly draftService: DraftService,
    private readonly storyService: StoryService,
  ) {}

  @Post('/')
  async publishStory(
    @Body() { draftId }: PublishStoryDto,
    @User() user: UserEntity,
  ) {
    const draft = await this.draftService.getDraftById(draftId, user);

    return this.storyService.publishStory(draft, user);
  }

  @Get('/')
  async getStories(@User() user: UserEntity) {
    return this.storyService.getStories(user);
  }

  @Get('/:storyId')
  async getStoryById(
    @Param('storyId') storyId: string,
    @User() user: UserEntity,
  ) {
    return this.storyService.getStoryById(storyId, user);
  }
}
