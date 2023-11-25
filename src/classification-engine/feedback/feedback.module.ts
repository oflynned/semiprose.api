import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Module({
  imports: [],
  providers: [FeedbackService],
  exports: [FeedbackService],
})
export class FeedbackModule {}
