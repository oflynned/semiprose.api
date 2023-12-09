import { Injectable } from '@nestjs/common';
import { WaitlistEntity } from './waitlist.entity';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class WaitlistService {
  constructor(private readonly manager: EntityManager) {}

  async enlistEmail(email: string) {
    const sanitisedEmail = email.trim().toLowerCase();
    const existingWaitlistedUser = await this.manager
      .getRepository(WaitlistEntity)
      .findOne({ email: sanitisedEmail });

    if (existingWaitlistedUser) {
      return existingWaitlistedUser;
    }

    const userToWaitlist = new WaitlistEntity();
    userToWaitlist.email = sanitisedEmail;

    await this.manager.persistAndFlush(userToWaitlist);

    return userToWaitlist;
  }
}
