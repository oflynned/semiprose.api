import { Injectable } from '@nestjs/common';
import { WaitlistEntity } from './waitlist.entity';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class WaitlistService {
  constructor(private readonly manager: EntityManager) {}

  async enlistEmail(email: string) {
    const sanitisedEmail = email.trim().toLowerCase();
    const existingWaitlistee = await this.manager
      .getRepository(WaitlistEntity)
      .findOne({ email: sanitisedEmail });

    if (existingWaitlistee) {
      return existingWaitlistee;
    }

    const waitlistee = new WaitlistEntity();
    waitlistee.email = sanitisedEmail;

    await this.manager.persistAndFlush(waitlistee);

    return waitlistee;
  }
}
