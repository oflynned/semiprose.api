import { Injectable } from '@nestjs/common';
import { SecretService } from '../secret/secret.service';
import { isDefined } from '../is-defined';
import { z } from 'zod';

@Injectable()
export class EnvironmentService {
  constructor(private readonly secretService: SecretService) {}

  getMode() {
    return this.secretService.getValue('MODE');
  }

  getPort() {
    const port = this.secretService.getValue('PORT');

    return isDefined(port) ? Number(port) : 3000;
  }

  getOpenAiApiKey() {
    return this.secretService.getValue('OPENAI_API_KEY');
  }

  getDatabaseUrl() {
    return this.secretService.getValue('DATABASE_URL');
  }

  getDatabaseCertificate() {
    return this.secretService.getDecodedValue('ENCODED_DATABASE_CERTIFICATE');
  }

  getFirebaseConfig(): Record<string, string> | null {
    const rawConfig = this.secretService.getDecodedValue(
      'ENCODED_FIREBASE_SERVICE_ACCOUNT',
    );

    if (!rawConfig) {
      return null;
    }

    const configZodShape = z.object({
      type: z.string(),
      project_id: z.string(),
      private_key_id: z.string(),
      private_key: z.string(),
      client_email: z.string(),
      client_id: z.string(),
      auth_uri: z.string(),
      token_uri: z.string(),
      auth_provider_x509_cert_url: z.string(),
      client_x509_cert_url: z.string(),
      universe_domain: z.string(),
    });

    const config = configZodShape.safeParse(JSON.parse(rawConfig));

    if (config.success === false) {
      return null;
    }

    return config.data;
  }
}
