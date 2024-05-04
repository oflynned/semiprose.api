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
  firebaseId: string;

  @Property()
  email: string;

  @Property()
  username: string;

  @Property()
  authenticationMethod: string;

  @Property()
  createdAt = new Date();

  @Property({ nullable: true })
  biography?: string;

  @Property({ nullable: true })
  lastUpdatedAt?: Date;

  @Property({ nullable: true })
  deletedAt?: Date;

  @Property()
  lastActiveAt: Date;

  @OneToMany(() => StoryEntity, (story) => story.author)
  stories = new Collection<StoryEntity>(this);

  @OneToMany(() => DraftEntity, (draft) => draft.author)
  drafts = new Collection<DraftEntity>(this);

  @OneToMany(() => CommentEntity, (comment) => comment.author)
  comments = new Collection<CommentEntity>(this);

  get initials() {
    return this.username.split('')[0];
  }
}
