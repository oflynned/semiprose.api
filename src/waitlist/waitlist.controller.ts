import { Body, Controller, Post } from '@nestjs/common';
import { WaitlistService } from './waitlist.service';

@Controller('/waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Post('/')
  async createWaitlist(@Body() { email }: { email: string }) {
    await this.waitlistService.enlistEmail(email);
  }
}
