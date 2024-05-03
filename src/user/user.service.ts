import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { UserEntity } from '../entity';

@Injectable()
export class UserService {
  constructor(private readonly entityManager: EntityManager) {}

  async createUser(name: string, email: string) {
    const user = new UserEntity();
    user.name = name;
    user.email = email;

    await this.entityManager.persistAndFlush(user);

    return user;
  }

  async getById(id: string) {
    return this.entityManager.findOne(UserEntity, { id });
  }

  async getByEmail(email: string) {
    return this.entityManager.findOne(UserEntity, { email });
  }
}
