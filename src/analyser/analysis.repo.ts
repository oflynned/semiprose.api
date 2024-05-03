import { Injectable } from '@nestjs/common';
import { Feedback } from './types';
import { DraftEntity } from '../entity';

@Injectable()
export class AnalysisRepo {
  constructor() {}

  createFeedback(draft: DraftEntity, feedback: Feedback) {
    return null;
  }

  getLatestFeedback(draft: DraftEntity) {
    return null;
  }
}
