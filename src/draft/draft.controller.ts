import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DraftService } from './draft.service';
import { CreateDraftDto } from './dto/create-draft.dto';
import { PromptService } from '../prompt/prompt.service';
import { UserEntity } from '../entity';
import { User } from '../decorators/user.decorator';
import { SupabaseGuard } from '../supabase/supabase.guard';

@UseGuards(SupabaseGuard)
@Controller('/drafts')
export class DraftController {
  constructor(
    private readonly draftService: DraftService,
    private readonly promptService: PromptService,
  ) {}

  @Post('/draft')
  async createDraft(
    @Body() { promptId, ...dto }: CreateDraftDto,
    @User() user: UserEntity,
  ) {
    const prompt = await this.promptService.getPromptById(promptId);
    const lastDraft = await this.draftService.getLatestDraft(prompt, user);

    return this.draftService.createDraft(dto, prompt, user, lastDraft);
  }

  @Get('/:draftId')
  getDraftById(@Param('draftId') draftId: string, @User() user: UserEntity) {
    return this.draftService.getDraftById(draftId, user);
  }
}
