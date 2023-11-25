import { Migration } from '@mikro-orm/migrations';

export class Migration20231125170210 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "waitlist" ("id" varchar(255) not null, "email" varchar(255) not null, constraint "waitlist_pkey" primary key ("id"));',
    );
  }
}
