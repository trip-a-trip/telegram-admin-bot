import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MODERATION_REQUEST_QUEUE } from '@trip-a-trip/lib';
import { TelegramModule, TelegramBot } from 'nest-telegram';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { ModuleRef } from '@nestjs/core';

import { ConfigModule } from './external/config.module';
import { bullProvider } from './external/bullProvider';
import { PlatformModule } from './platform/platform.module';
import { TelegramOptionsFactory } from './external/TelegramOptionsFactory';
import { HelloHandler } from './core/presentation/telegram/HelloHandler';
import { ModerationRequestProcessor } from './core/presentation/queue/ModerationRequestProcessor';
import { ModerationRequestTemplate } from './core/presentation/template/ModerationRequestTemplate';
import { ModerationHandler } from './core/presentation/telegram/ModerationHandler';

@Module({
  imports: [
    ConfigModule,
    PlatformModule,
    BullModule.registerQueueAsync(bullProvider(MODERATION_REQUEST_QUEUE)),
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TelegramOptionsFactory,
    }),
  ],
  controllers: [],
  providers: [
    HelloHandler,
    ModerationRequestTemplate,
    ModerationRequestProcessor,
    ModerationHandler,
  ],
})
export class AppModule implements NestModule {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly telegramBot: TelegramBot,
  ) {}

  onModuleInit() {
    this.telegramBot.init(this.moduleRef);
  }

  configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
