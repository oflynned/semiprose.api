import { Injectable } from '@nestjs/common';
import { Story } from '../analyser/content';
import { EntityManager } from '@mikro-orm/postgresql';
import { DraftEntity, StoryEntity, StoryState, UserEntity } from '../entity';

@Injectable()
export class StoryService {
  constructor(private readonly manager: EntityManager) {}

  async publishStory(draft: DraftEntity, author: UserEntity) {
    const story = new StoryEntity();

    story.title = draft.title;
    story.paragraphs = draft.paragraphs;
    story.state = StoryState.SUBMITTED;
    story.author = author;

    await this.manager.persistAndFlush(story);

    return story;
  }

  async getStories(author: UserEntity) {
    return this.manager.find(StoryEntity, { author });
  }

  async getStoryById(id: string, author: UserEntity) {
    return this.manager.findOne(StoryEntity, { id, author });
  }
}
