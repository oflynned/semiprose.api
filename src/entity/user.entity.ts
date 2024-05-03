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
import { CommentEntity } from './comment.entity';

@Entity({ tableName: 'users' })
export class UserEntity {
  @PrimaryKey()
  id = v4();

  @Property()
  createdAt = new Date();

  @Property()
  name: string;

  @Property()
  biography?: string;

  @Property()
  lastUpdatedAt?: Date;

  @Property()
  deletedAt?: Date;

  @Property()
  lastActiveAt: Date;

  @Property()
  email: string;

  @OneToMany(() => StoryEntity, (story) => story.author)
  stories = new Collection<StoryEntity>(this);

  @OneToMany(() => DraftEntity, (draft) => draft.author)
  drafts = new Collection<DraftEntity>(this);

  @OneToMany(() => CommentEntity, (comment) => comment.author)
  comments = new Collection<CommentEntity>(this);
}
