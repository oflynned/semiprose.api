import { Module } from '@nestjs/common';
import { ChatGptService } from './chat-gpt.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [ChatGptService],
  exports: [ChatGptService],
})
export class ChatGptModule {}
