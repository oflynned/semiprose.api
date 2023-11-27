import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

@Entity({ tableName: 'waitlist' })
export class WaitlistEntity {
  @PrimaryKey()
  id: string = uuid();

  @Property({ type: 'datetime', nullable: false })
  createdAt = new Date();

  @Property({ type: 'string', nullable: false })
  email: string;
}
