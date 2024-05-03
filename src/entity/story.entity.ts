import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { UserEntity } from './user.entity';
import { PromptEntity } from './prompt.entity';
import { StoryState } from './state';

@Entity({ tableName: 'stories' })
export class StoryEntity {
  @PrimaryKey()
  id = v4();

  @Property()
  createdAt = new Date();

  @Property()
  publishedAt?: Date;

  @Property()
  title: string;

  @Property()
  paragraphs: string[];

  @Enum(() => StoryState)
  state: StoryState;

  @ManyToOne(() => UserEntity)
  author: UserEntity;

  @ManyToOne()
  prompt: PromptEntity;
}
