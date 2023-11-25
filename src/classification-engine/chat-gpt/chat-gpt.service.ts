import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { Prompt } from '../prompt';

@Injectable()
export class ChatGptService {
  private readonly client: OpenAI;

  constructor(configService: ConfigService) {
    this.client = new OpenAI({ apiKey: configService.get('OPENAI_API_KEY') });
  }

  private async getResponse(prompt: string, sentiment?: string) {
    Logger.log(prompt);

    const { data } = await this.client.chat.completions
      .create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: sentiment },
          { role: 'user', content: prompt },
        ],
      })
      .withResponse();

    const response = data.choices.at(-1).message.content;

    Logger.log(response);

    return response;
  }

  async prompt(prompt: string | Prompt) {
    // TODO the last messages need to be saved and passed in here if we want to have the full context
    //      throwing these into a database would be a good idea to prevent it from going in a loop
    //      especially when it comes to giving feedback on multiple drafts of the same story
    //      but this will use a lot of tokens, so we need to be careful about how we do this

    if (typeof prompt === 'string') {
      return this.getResponse(prompt);
    }

    return this.getResponse(prompt.getPrompt(), prompt.getSentiment());
  }
}
