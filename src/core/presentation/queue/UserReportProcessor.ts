import { Configuration } from '@solid-soda/config';
import { Processor, Process } from '@nestjs/bull';
import { TelegramClient } from 'nest-telegram';
import { Job } from 'bull';

import { USER_REPORT_QUEUE } from '&app/external/constants';
import { UserReporter } from '&app/core/application/UserReporter';

import { UserReportTemplate } from '../template/UserReportTemplate';
import { ReportJobPayload } from './ReportJobPayload';

@Processor(USER_REPORT_QUEUE)
export class UserReportProcessor {
  private readonly chatId: string;

  constructor(
    private readonly userReporter: UserReporter,
    private readonly template: UserReportTemplate,
    private readonly telegram: TelegramClient,
    config: Configuration,
  ) {
    this.chatId = config.getStringOrThrow('TEAM_CHAT_ID');
  }

  @Process()
  async handleDefaultCurrencyChange(job: Job<ReportJobPayload>) {
    try {
      const report = await this.userReporter.report(job.data.group);
      const template = await this.template.render(report);

      await this.telegram.sendMarkdown(this.chatId, template);

      await job.moveToCompleted();
    } catch (error) {
      await job.moveToFailed(error);
    }
  }
}
