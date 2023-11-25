import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalyserModule } from './analyser/analyser.module';
import { PromptModule } from './prompt/prompt.module';
import { ParserModule } from './parser/parser.module';
import { StoryModule } from './story/story.module';
import { ChatGptModule } from './classification-engine/chat-gpt/chat-gpt.module';
import { FeatureFlagModule } from './feature-flag/feature-flag.module';
import { WaitlistModule } from './waitlist/waitlist.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { WaitlistEntity } from './waitlist/waitlist.entity';
import { SecretModule } from './secret/secret.module';
import { EnvironmentModule } from './environment/environment.module';
import { EnvironmentService } from './environment/environment.service';
import { defineConfig } from '@mikro-orm/postgresql';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SecretModule,
    EnvironmentModule,
    AnalyserModule,
    ChatGptModule,
    StoryModule,
    PromptModule,
    ParserModule,
    FeatureFlagModule,
    WaitlistModule,
    MikroOrmModule.forRootAsync({
      imports: [EnvironmentModule],
      inject: [EnvironmentService],
      useFactory: (envVarService: EnvironmentService) => {
        const url = envVarService.getDatabaseUrl();
        const certificate = envVarService.getDatabaseCertificate();
        const sslOptions = certificate.ok
          ? {
              connection: {
                ssl: {
                  ca: certificate.val,
                },
              },
            }
          : {};

        if (!url.ok) {
          throw new Error('DATABASE_URL is not set');
        }

        return defineConfig({
          clientUrl: url.val,
          driverOptions: {
            ...sslOptions,
            keepAlive: true,
          },
          entities: [WaitlistEntity],
        });
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
