// eslint-disable-next-line @typescript-eslint/no-var-requires
import { UserEntity } from './entity';

require('dotenv').config();

import { Err } from 'ts-results';
import { defineConfig } from '@mikro-orm/postgresql';
import { ConfigService } from '@nestjs/config';
import { EnvironmentService } from './environment/environment.service';
import { WaitlistEntity } from './waitlist/waitlist.entity';
import { SecretService } from './secret/secret.service';

const configService = new ConfigService(process.env);
const secretService = new SecretService(configService);
const environmentService = new EnvironmentService(secretService);
const url = environmentService.getDatabaseUrl();

if (!url) {
  throw new Err('Database URL is not set');
}

const certificate = environmentService.getDatabaseCertificate();

const sslOptions = certificate
  ? {
      connection: {
        ssl: {
          ca: certificate,
        },
      },
    }
  : {};

export default defineConfig({
  clientUrl: url,
  entities: [WaitlistEntity, UserEntity],
  migrations: {
    disableForeignKeys: false,
  },
  pool: { min: 0, max: 16 },
  driverOptions: {
    ...sslOptions,
    keepAlive: true,
  },
});
