import { z } from 'zod';

export const ImprovementSchema = z.object({
  title: z
    .string()
    .optional()
    .describe(
      'A short title for the feedback content given in min 1 word and max 5 words.',
    ),
  conciseFeedback: z
    .string()
    .describe(
      'A short summary of feedback in a couple of words to show below the title.',
    ),
  indepthFeedback: z
    .string()
    .describe(
      'An in-depth analysis of the feedback given, including suggestions on how to improve and specifics on what to improve on.',
    ),
  example: z
    .string()
    .describe('The exact example sentence from the content submitted.'),
  gradingWeight: z
    .number()
    .describe(
      'The weight of the feedback for an individual item of criticism, which can be used to subtract from a perfect score.',
    ),
});

export const FeedbackSchema = z.array(ImprovementSchema);
