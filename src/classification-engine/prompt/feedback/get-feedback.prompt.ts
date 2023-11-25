import { Prompt } from '../prompt';
import { FeedbackSchema } from './feedback.schema';

export class GetFeedbackPrompt extends Prompt {
  getPurpose() {
    return [
      'You feedback, if any, to users on how to improve their writing skills.',
      'You generate a report about the quality of user input.',
      'You ensure that users are not discouraged by overly negative feedback.',
      'Allowing an empty list of improvements is okay if writing is good.',
    ].join(' ');
  }

  getSchema() {
    return FeedbackSchema;
  }
}
