import { Module } from '@nestjs/common';
import { PromptController } from './prompt.controller';
import { PromptService } from './prompt.service';
import { ChatGptModule } from '../classification-engine/chat-gpt/chat-gpt.module';

@Module({
  imports: [ChatGptModule],
  controllers: [PromptController],
  providers: [PromptService],
})
export class PromptModule {}
