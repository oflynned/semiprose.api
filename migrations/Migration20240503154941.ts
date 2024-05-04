import { Migration } from '@mikro-orm/migrations';

export class Migration20240503154941 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "prompts" ("id" varchar(255) not null, "created_at" varchar(255) not null, "week" int not null, "year" int not null, "prompt" varchar(255) not null, constraint "prompts_pkey" primary key ("id"));');

    this.addSql('create table "users" ("id" varchar(255) not null, "firebase_id" varchar(255) not null, "email" varchar(255) not null, "username" varchar(255) not null, "authentication_method" varchar(255) not null, "created_at" varchar(255) not null, "biography" varchar(255) null, "last_updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "last_active_at" timestamptz(0) not null, constraint "users_pkey" primary key ("id"));');

    this.addSql('create table "stories" ("id" varchar(255) not null, "created_at" varchar(255) not null, "published_at" timestamptz(0) not null, "title" varchar(255) not null, "paragraphs" text[] not null, "state" text check ("state" in (\'submitted\', \'review\', \'published\', \'rejected\', \'removed\', \'deleted\')) not null, "author_id" varchar(255) not null, "prompt_id" varchar(255) not null, constraint "stories_pkey" primary key ("id"));');

    this.addSql('create table "drafts" ("id" varchar(255) not null, "created_at" varchar(255) not null, "revision" int not null, "title" varchar(255) not null, "paragraphs" text[] not null, "author_id" varchar(255) not null, "prompt_id" varchar(255) not null, constraint "drafts_pkey" primary key ("id"));');

    this.addSql('create table "comments" ("id" varchar(255) not null, "created_at" varchar(255) not null, "deleted_at" timestamptz(0) not null, "content" varchar(255) not null, "author_id" varchar(255) not null, constraint "comments_pkey" primary key ("id"));');

    this.addSql('create table "waitlist" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "email" varchar(255) not null, constraint "waitlist_pkey" primary key ("id"));');

    this.addSql('alter table "stories" add constraint "stories_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "stories" add constraint "stories_prompt_id_foreign" foreign key ("prompt_id") references "prompts" ("id") on update cascade;');

    this.addSql('alter table "drafts" add constraint "drafts_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "drafts" add constraint "drafts_prompt_id_foreign" foreign key ("prompt_id") references "prompts" ("id") on update cascade;');

    this.addSql('alter table "comments" add constraint "comments_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;');
  }

}
