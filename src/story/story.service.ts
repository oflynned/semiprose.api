import { Injectable } from '@nestjs/common';
import { Story } from '../analyser/content';

@Injectable()
export class StoryService {
  constructor() {}

  getStories() {
    return [];
  }

  getStoryById(id: string) {
    return null;
  }

  createDraft(story: Story) {
    return story;
  }

  publish(storyId: string) {
    return null;
  }
}
