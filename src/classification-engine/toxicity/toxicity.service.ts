import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { GetToxicityPrompt, ToxicitySchema } from '../prompt';
import { ChatGptService } from '../chat-gpt/chat-gpt.service';
import { ParserService } from '../../parser/parser.service';
import { Story } from '../../analyser/content';

type Toxicity = z.infer<typeof ToxicitySchema>;

@Injectable()
export class ToxicityService {
  constructor(
    private readonly chatgpt: ChatGptService,
    private readonly parserService: ParserService,
  ) {}

  async getToxicity(story: Story) {
    const prompt = new GetToxicityPrompt([story.title, ...story.paragraphs]);
    const response = await this.chatgpt.prompt(prompt);

    return this.parserService.toShape<Toxicity>(response, prompt.getSchema());
  }
}
