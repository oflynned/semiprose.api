import { Module } from '@nestjs/common';
import { ToxicityService } from './toxicity.service';

@Module({
  imports: [],
  providers: [ToxicityService],
  exports: [ToxicityService],
})
export class ToxicityModule {}
