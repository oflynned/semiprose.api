import { Controller, Get, Param } from '@nestjs/common';
import { PromptService } from './prompt.service';

@Controller('/prompts')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @Get('/latest')
  async getWritingPrompt() {
    return this.promptService.getCurrentWritingPrompt();
  }

  @Get('/:promptId')
  async getPromptById(@Param('promptId') promptId: string) {
    return this.promptService.getPromptById(promptId);
  }
}
