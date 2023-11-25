import { ToxicitySchema } from './toxicity.schema';
import { Prompt } from '../prompt';

export class GetToxicityPrompt extends Prompt {
  getPurpose() {
    return [
      'You review user generated content.',
      'You ensure that dangerous and sexual content is not published.',
      'You generate a report about the toxicity of user input.',
    ].join(' ');
  }

  getSchema() {
    return ToxicitySchema;
  }
}
