import { Inject, Injectable, Scope } from '@nestjs/common';
import { EnvironmentService } from '../environment/environment.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ExtractJwt } from 'passport-jwt';

@Injectable({ scope: Scope.REQUEST })
export class SupabaseService {
  private instance: SupabaseClient;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly environment: EnvironmentService,
  ) {}

  getClient() {
    if (this.instance) {
      return this.instance;
    }

    const url = this.environment.getSupabaseUrl();
    const key = this.environment.getSupabaseKey();

    if (!url.ok || !key.ok) {
      throw new Error('Client not initialised');
    }

    const jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(this.request);

    this.instance = createClient(url.val, key.val, {
      global: { headers: { Authorization: `Bearer ${jwt}` } },
      auth: { persistSession: true },
    });

    return this.instance;
  }
}
