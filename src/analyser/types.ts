import { z } from 'zod';
import { FeedbackSchema } from '../classification-engine/prompt';

export type Feedback = z.infer<typeof FeedbackSchema>;
