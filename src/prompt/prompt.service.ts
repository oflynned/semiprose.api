import { Injectable } from '@nestjs/common';
import { ChatGptService } from '../classification-engine/chat-gpt/chat-gpt.service';

@Injectable()
export class PromptService {
  constructor(private readonly chatgpt: ChatGptService) {}

  async getCurrentWritingPrompt() {
    return {
      id: '43',
      week: 43,
      text: 'Amidst the whispers of a forgotten forest, a curious wanderer stumbles upon a hidden door that promises to reveal the greatest secret of their life. Little do they know, this door leads to a realm where time flows differently, and they must navigate a series of surreal challenges to uncover the truth before the forest claims them forever.',
    };
  }

  async getNewPrompt() {
    // this should be generated every week at 9am UTC on Monday via a cron job

    // TODO could also ask for tags and specific themes
    return this.chatgpt.prompt(
      'Give me a paragraph to act as a writing prompt.',
    );
  }
}
