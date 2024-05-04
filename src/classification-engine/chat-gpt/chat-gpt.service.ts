import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { Prompt } from '../prompt';
import { EnvironmentService } from '../../environment/environment.service';

@Injectable()
export class ChatGptService {
  private readonly client: OpenAI;

  constructor(private readonly environmentService: EnvironmentService) {
    const apiKey = this.environmentService.getOpenAiApiKey();

    if (!apiKey) {
      throw new Error('OpenAI API key is not defined');
    }

    this.client = new OpenAI({ apiKey });
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
