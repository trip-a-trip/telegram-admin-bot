import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TelegramModule, TelegramBot } from 'nest-telegram';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { ModuleRef } from '@nestjs/core';

import { ConfigModule } from './external/config.module';
import { bullProvider } from './external/bullProvider';
import { USER_REPORT_QUEUE, USAGE_REPORT_QUEUE } from './external/constants';
import { ReportSetupManager } from './core/presentation/queue/ReportSetupManager';
import { PlatformModule } from './platform/platform.module';
import { UserReportTemplate } from './core/presentation/template/UserReportTemplate';
import { UserReportProcessor } from './core/presentation/queue/UserReportProcessor';
import { TelegramOptionsFactory } from './external/TelegramOptionsFactory';
import { UserReporter } from './core/application/UserReporter';
import { HelloHandler } from './core/presentation/telegram/HelloHandler';
import { typeOrmProvider } from './external/typeOrmProvider';
import { UserHistory } from './core/domain/UserHistory.entity';
import { Historian } from './core/infrastructure/Historian';
import { UsageReporter } from './core/application/UsageReporter';
import { UsageReportProcessor } from './core/presentation/queue/UsageReportProcessor';
import { UsageReportTemplate } from './core/presentation/template/UsageReportTemplate';

@Module({
  imports: [
    ConfigModule,
    PlatformModule,
    BullModule.registerQueueAsync(bullProvider(USER_REPORT_QUEUE)),
    BullModule.registerQueueAsync(bullProvider(USAGE_REPORT_QUEUE)),
    TypeOrmModule.forRootAsync(typeOrmProvider),
    TypeOrmModule.forFeature([UserHistory]),
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TelegramOptionsFactory,
    }),
  ],
  controllers: [],
  providers: [
    Historian,
    HelloHandler,
    UserReporter,
    UsageReporter,
    ReportSetupManager,
    UserReportTemplate,
    UsageReportProcessor,
    UsageReportTemplate,
    UserReportProcessor,
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
