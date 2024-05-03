import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { StoryEntity } from './story.entity';
import { DraftEntity } from './draft.entity';

@Entity({ tableName: 'prompts' })
export class PromptEntity {
  @PrimaryKey()
  id = v4();

  @Property()
  createdAt = new Date();

  @Property()
  week: number;

  @Property()
  year: number;

  @Property()
  prompt: string;

  @OneToMany(() => StoryEntity, (story) => story.prompt)
  stories = new Collection<StoryEntity>(this);

  @OneToMany(() => DraftEntity, (draft) => draft.prompt)
  drafts = new Collection<DraftEntity>(this);
}
