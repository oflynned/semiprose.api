import { UserEntity } from '../entity';

export type UserType = Pick<
  UserEntity,
  'id' | 'createdAt' | 'lastActiveAt' | 'username' | 'biography' | 'initials'
>;

export const toType = (user: UserEntity): UserType => ({
  id: user.id,
  createdAt: user.createdAt,
  lastActiveAt: user.lastActiveAt,
  username: user.username,
  biography: user.biography,
  initials: user.initials,
});
