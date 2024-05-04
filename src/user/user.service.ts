import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { UserEntity } from '../entity';
import { CreateUserDto, createUserSchema } from './create-user.dto';

export type CreateUserDao = CreateUserDto & {
  firebaseId: string;
  authenticationMethod: string;
  email: string;
};

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly entityManager: EntityManager) {}

  async createUser(dao: CreateUserDao) {
    const result = await createUserSchema.safeParseAsync(dao);

    if (result.success === false) {
      this.logger.error('Invalid user data', result.error);

      return null;
    }

    this.logger.log('Creating user', result.data);

    const timestamp = new Date();
    const user = this.entityManager.create(UserEntity, {
      ...result.data,
      createdAt: timestamp,
      lastActiveAt: timestamp,
    });

    await this.entityManager.persistAndFlush(user);

    return user;
  }

  async getById(id: string) {
    return this.entityManager.findOne(UserEntity, { id });
  }

  async getByFirebaseUid(uid: string) {
    return this.entityManager.findOne(UserEntity, { firebaseId: uid });
  }

  async getByUsername(username: string) {
    return this.entityManager.findOne(UserEntity, { username });
  }

  async getByEmail(email: string) {
    return this.entityManager.findOne(UserEntity, { email });
  }
}
