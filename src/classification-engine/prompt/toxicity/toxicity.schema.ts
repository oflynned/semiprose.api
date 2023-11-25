import { z } from 'zod';

export const ToxicitySchema = z.object({
  score: z
    .number()
    .min(0)
    .max(100)
    .describe('The toxicity score of the story.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the toxicity score of the story.'),
});
