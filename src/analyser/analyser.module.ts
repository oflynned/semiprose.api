import { Module } from '@nestjs/common';
import { AnalyserController } from './analyser.controller';
import { AnalyserService } from './analyser.service';
import { ParserModule } from '../parser/parser.module';
import { ChatGptModule } from '../classification-engine/chat-gpt/chat-gpt.module';
import { FeatureFlagModule } from '../feature-flag/feature-flag.module';
import { AnalysisRepo } from './analysis.repo';
import { DraftModule } from '../draft/draft.module';

@Module({
  imports: [ChatGptModule, ParserModule, FeatureFlagModule, DraftModule],
  controllers: [AnalyserController],
  providers: [AnalyserService, AnalysisRepo],
})
export class AnalyserModule {}
