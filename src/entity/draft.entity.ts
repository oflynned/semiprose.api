import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { UserEntity } from './user.entity';
import { PromptEntity } from './prompt.entity';

@Entity({ tableName: 'drafts' })
export class DraftEntity {
  @PrimaryKey()
  id = v4();

  @Property()
  createdAt = new Date();

  @Property()
  revision: number;

  @Property()
  title: string;

  @Property()
  paragraphs: string[];

  @ManyToOne(() => UserEntity)
  author: UserEntity;

  @ManyToOne(() => PromptEntity)
  prompt: PromptEntity;
}
