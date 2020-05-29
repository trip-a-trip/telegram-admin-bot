import { Configuration } from '@solid-soda/config';
import { Processor, Process } from '@nestjs/bull';
import { TelegramClient } from 'nest-telegram';
import { Job } from 'bull';

import { USAGE_REPORT_QUEUE } from '&app/external/constants';
import { UsageReporter } from '&app/core/application/UsageReporter';

import { ReportJobPayload } from './ReportJobPayload';
import { UsageReportTemplate } from '../template/UsageReportTemplate';

@Processor(USAGE_REPORT_QUEUE)
export class UsageReportProcessor {
  private readonly chatId: string;

  constructor(
    private readonly usageReporter: UsageReporter,
    private readonly template: UsageReportTemplate,
    private readonly telegram: TelegramClient,
    config: Configuration,
  ) {
    this.chatId = config.getStringOrThrow('TEAM_CHAT_ID');
  }

  @Process()
  async handleUsageReport(job: Job<ReportJobPayload>) {
    try {
      const report = await this.usageReporter.report(job.data.group);
      console.log(report);
      const template = await this.template.render(report);

      await this.telegram.sendMarkdown(this.chatId, template);

      await job.moveToCompleted();
    } catch (error) {
      console.log(error);
      await job.moveToFailed(error);
    }
  }
}
