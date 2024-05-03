import { Injectable } from '@nestjs/common';
import { SecretService } from '../secret/secret.service';

@Injectable()
export class EnvironmentService {
  constructor(private readonly secretService: SecretService) {}

  getPort() {
    const port = this.secretService.getValue('PORT');

    return port.ok ? Number(port.val) : 3000;
  }

  getDatabaseUrl() {
    return this.secretService.getValue('DATABASE_URL');
  }

  getDatabaseCertificate() {
    return this.secretService.getDecodedValue('ENCODED_DATABASE_CERTIFICATE');
  }

  getSupabaseUrl() {
    return this.secretService.getValue('SUPABASE_URL');
  }

  getSupabaseKey() {
    return this.secretService.getValue('SUPABASE_KEY');
  }

  getSupabaseSecret() {
    return this.secretService.getValue('SUPABASE_SECRET');
  }
}
