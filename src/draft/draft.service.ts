import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { DraftEntity, PromptEntity, UserEntity } from '../entity';
import { CreateDraftDto } from './dto/create-draft.dto';

@Injectable()
export class DraftService {
  constructor(private readonly manager: EntityManager) {}

  async createDraft(
    dto: Omit<CreateDraftDto, 'promptId'>,
    prompt: PromptEntity,
    author: UserEntity,
    lastDraft?: DraftEntity,
  ) {
    const draft = new DraftEntity();
    draft.title = dto.title;
    draft.paragraphs = dto.paragraphs;
    draft.author = author;
    draft.prompt = prompt;
    draft.revision = lastDraft?.revision + 1 ?? 1;

    await this.manager.persistAndFlush(draft);

    return draft;
  }

  async getDrafts(author: UserEntity) {
    return this.manager.find(DraftEntity, { author });
  }

  async getDraftById(id: string, author: UserEntity) {
    return this.manager.findOne(DraftEntity, { id, author });
  }

  async getLatestDraft(prompt: PromptEntity, author: UserEntity) {
    return this.manager.findOne(
      DraftEntity,
      { prompt, author },
      { orderBy: { revision: 'DESC' } },
    );
  }
}
