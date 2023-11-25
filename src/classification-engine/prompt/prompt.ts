import { z } from 'zod';
import { printNode, zodToTs } from 'zod-to-ts';

export abstract class Prompt {
  constructor(private readonly input: string[]) {}

  protected abstract getPurpose(): string;

  protected abstract getSchema(): z.Schema;

  private getContext() {
    return printNode(zodToTs(this.getSchema()).node);
  }

  private getContent() {
    return ['```', ...this.input, '```'].join('\n');
  }

  getFormatRequest() {
    return 'Analyse the triple-backtick-enclosed text below to fill in the data as described. Respond only as a JSON document, and strictly conform to the following typescript schema, paying attention to comments as requirements:';
  }

  getSentiment() {
    return 'You are a helpful and kind writing critic.';
  }

  getPrompt() {
    return [
      this.getPurpose(),
      this.getFormatRequest(),
      this.getContext(),
      this.getContent(),
    ].join('\n\n');
  }
}
