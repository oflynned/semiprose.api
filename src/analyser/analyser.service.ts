import { Injectable } from '@nestjs/common';
import { ParserService } from '../parser/parser.service';
import { z } from 'zod';
import { Story } from './content';
import {
  FeedbackSchema,
  GetFeedbackPrompt,
  GetToxicityPrompt,
  ToxicitySchema,
} from '../classification-engine/prompt';
import { ChatGptService } from '../classification-engine/chat-gpt/chat-gpt.service';
import { AnalysisRepo } from './analysis.repo';
import { UserEntity } from '../entity';
import { DraftService } from '../draft/draft.service';

type Toxicity = z.infer<typeof ToxicitySchema>;
type Feedback = z.infer<typeof FeedbackSchema>;

@Injectable()
export class AnalyserService {
  constructor(
    private readonly chatgpt: ChatGptService,
    private readonly parserService: ParserService,
    private readonly analysisRepo: AnalysisRepo,
    private readonly draftService: DraftService,
  ) {}

  async getToxicity(story: Story) {
    const prompt = new GetToxicityPrompt([story.title, ...story.paragraphs]);
    const response = await this.chatgpt.prompt(prompt);

    return this.parserService.toShape<Toxicity>(response, prompt.getSchema());
  }

  async requestFeedback(draftId: string, user: UserEntity) {
    const draft = await this.draftService.getDraftById(draftId, user);

    // TODO this should really be moved to a queue since it's a long running operation
    const prompt = new GetFeedbackPrompt([draft.title, ...draft.paragraphs]);
    const response = await this.chatgpt.prompt(prompt);

    const feedback = await this.parserService.toShape<Feedback>(
      response,
      prompt.getSchema(),
    );

    return this.analysisRepo.createFeedback(draft, feedback);
  }

  async getFeedback(draftId: string, user: UserEntity) {
    const draft = await this.draftService.getDraftById(draftId, user);

    return this.analysisRepo.getLatestFeedback(draft);
  }
}
