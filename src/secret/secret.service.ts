import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SecretNotFoundException } from './secret-not-found.exception';
import { Err, Ok, Result } from 'ts-results';

@Injectable()
export class SecretService {
  constructor(private readonly configService: ConfigService) {}

  getValue(
    key: string,
    defaultValue?: string,
  ): Result<string, SecretNotFoundException> {
    const secret = this.configService.get(key);

    if (secret) {
      return Ok(secret);
    }

    if (defaultValue) {
      return Ok(defaultValue);
    }

    return Err(new SecretNotFoundException());
  }

  getDecodedValue(key: string): Result<string, SecretNotFoundException> {
    const decode = (value: string) =>
      Buffer.from(value, 'base64').toString('utf-8');

    const secret = this.configService.get(key);

    if (secret) {
      return Ok(decode(secret));
    }

    return Err(new SecretNotFoundException());
  }
}
