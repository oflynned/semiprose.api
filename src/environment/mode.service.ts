import { Injectable } from '@nestjs/common';
import { EnvironmentService } from './environment.service';

export type Mode = 'development' | 'production' | 'test';

@Injectable()
export class ModeService {
  constructor(private readonly environmentService: EnvironmentService) {}

  isProduction() {
    return this.getMode() === 'production';
  }

  isFacingEngineer() {
    return this.isDevelopment() || this.isTest();
  }

  isFacingEndUser() {
    return !(this.isDevelopment() || this.isTest());
  }

  isDevelopment() {
    return this.getMode() === 'development';
  }

  isTest() {
    return this.getMode() === 'test';
  }

  getMode(): Mode {
    const mode = this.environmentService.getMode().toLowerCase().trim();

    if (mode === 'development' || mode === 'production' || mode === 'test') {
      return mode;
    }

    throw new Error(`Invalid mode: ${mode}`);
  }
}
