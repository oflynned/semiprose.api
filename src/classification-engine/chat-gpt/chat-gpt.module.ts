import { Module } from '@nestjs/common';
import { ChatGptService } from './chat-gpt.service';
import { EnvironmentModule } from '../../environment/environment.module';

@Module({
  imports: [EnvironmentModule],
  providers: [ChatGptService],
  exports: [ChatGptService],
})
export class ChatGptModule {}
