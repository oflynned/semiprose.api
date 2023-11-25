import { Injectable } from '@nestjs/common';
import { Feedback } from './types';

@Injectable()
export class AnalysisRepo {
  constructor() {}

  createFeedback(storyId: string, feedback: Feedback) {
    return null;
  }

  getLatestFeedback(storyId: string) {
    return null;
  }
}
