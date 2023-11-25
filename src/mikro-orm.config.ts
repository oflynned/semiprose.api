// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { defineConfig } from '@mikro-orm/postgresql';
import { ConfigService } from '@nestjs/config';
import { EnvironmentService } from './environment/environment.service';
import { WaitlistEntity } from './waitlist/waitlist.entity';
import { SecretService } from './secret/secret.service';

const configService = new ConfigService(process.env);
const secretService = new SecretService(configService);
const environmentService = new EnvironmentService(secretService);
const url = environmentService.getDatabaseUrl();

if (!url.ok) {
  throw url.val;
}

const certificate = environmentService.getDatabaseCertificate();

const sslOptions = certificate.ok
  ? {
      connection: {
        ssl: {
          ca: certificate.val,
        },
      },
    }
  : {};

export default defineConfig({
  clientUrl: url.val,
  entities: [WaitlistEntity],
  migrations: {
    disableForeignKeys: false,
  },
  pool: { min: 0, max: 16 },
  driverOptions: {
    ...sslOptions,
    keepAlive: true,
  },
});
