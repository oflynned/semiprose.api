import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { UserEntity } from './user.entity';

@Entity({ tableName: 'comments' })
export class CommentEntity {
  @PrimaryKey()
  id = v4();

  @Property()
  createdAt = new Date();

  @Property()
  deletedAt?: Date;

  @Property()
  content: string;

  @ManyToOne(() => UserEntity)
  author: UserEntity;
}
