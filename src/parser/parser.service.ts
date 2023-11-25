import { Injectable } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ParserService {
  async toShape<T>(text: string, schema: ZodSchema): Promise<T | null> {
    try {
      const structuredResponse = JSON.parse(text);

      return schema.parseAsync(structuredResponse);
    } catch (e) {
      return null;
    }
  }
}
