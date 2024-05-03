import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { SupabaseStrategy } from './supabase.strategy';
import { SupabaseGuard } from './supabase.guard';
import { EnvironmentModule } from '../environment/environment.module';

@Module({
  imports: [EnvironmentModule],
  providers: [SupabaseService, SupabaseStrategy, SupabaseGuard],
  exports: [SupabaseService, SupabaseStrategy, SupabaseGuard],
})
export class SupabaseModule {}
