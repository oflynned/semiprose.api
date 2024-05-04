import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isDefined } from '../is-defined';

@Injectable()
export class SecretService {
  constructor(private readonly configService: ConfigService) {}

  getValue(key: string, defaultValue?: string): string | null {
    const secret = this.configService.get<string | undefined>(key);

    if (isDefined(secret)) {
      return secret;
    }

    if (isDefined(defaultValue)) {
      return defaultValue;
    }

    return null;
  }

  getDecodedValue(key: string) {
    const decode = (value: string) =>
      Buffer.from(value, 'base64').toString('utf-8');

    const secret = this.configService.get<string>(key);

    if (secret) {
      return decode(secret);
    }

    return null;
  }
}
