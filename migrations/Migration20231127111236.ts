import { Migration } from '@mikro-orm/migrations';

export class Migration20231127111236 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "waitlist" add column "created_at" timestamptz(0) not null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "waitlist" drop column "created_at";');
  }
}
