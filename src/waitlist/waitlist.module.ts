import { Module } from '@nestjs/common';
import { WaitlistService } from './waitlist.service';
import { WaitlistController } from './waitlist.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { WaitlistEntity } from './waitlist.entity';

@Module({
  imports: [MikroOrmModule.forFeature([WaitlistEntity])],
  controllers: [WaitlistController],
  providers: [WaitlistService],
})
export class WaitlistModule {}
