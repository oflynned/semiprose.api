import { Injectable } from '@nestjs/common';
import { ChatGptService } from '../classification-engine/chat-gpt/chat-gpt.service';
import { EntityManager } from '@mikro-orm/postgresql';
import { PromptEntity } from '../entity';
import { v4 } from 'uuid';

@Injectable()
export class PromptService {
  constructor(
    private readonly chatgpt: ChatGptService,
    private readonly entityManager: EntityManager,
  ) {}

  async createPrompt(week: number, year: number) {
    const entity = new PromptEntity();
    entity.prompt = await this.chatgpt.prompt(
      'Give me a paragraph to act as a writing prompt.',
    );
    entity.week = week;
    entity.year = year;

    await this.entityManager.persistAndFlush(entity);

    return entity;
  }

  async getPromptById(id: string) {
    return this.entityManager.findOne(PromptEntity, { id });
  }

  async getCurrentWritingPrompt() {
    return {
      id: v4(),
      week: 52,
      year: 2023,
      text: 'Amidst the whispers of a forgotten forest, a curious wanderer stumbles upon a hidden door that promises to reveal the greatest secret of their life. Little do they know, this door leads to a realm where time flows differently, and they must navigate a series of surreal challenges to uncover the truth before the forest claims them forever.',
    };
  }
}
