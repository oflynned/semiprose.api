import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { DraftModule } from './draft/draft.module';
import { HttpLoggerMiddleware } from './logger/request.logger';
import { UserModule } from './user/user.module';
import { UserEntity } from './entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SecretModule,
    EnvironmentModule,
    AnalyserModule,
    ChatGptModule,
    StoryModule,
    UserModule,
    DraftModule,
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
        const sslOptions = certificate
          ? {
              connection: {
                ssl: {
                  ca: certificate,
                },
              },
            }
          : {};

        if (!url) {
          throw new Error('DATABASE_URL is not set');
        }

        return defineConfig({
          clientUrl: url,
          driverOptions: {
            ...sslOptions,
            keepAlive: true,
          },
          entities: [WaitlistEntity, UserEntity],
        });
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
