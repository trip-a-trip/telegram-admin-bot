import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { USER_REPORT_QUEUE, USAGE_REPORT_QUEUE } from '&app/external/constants';
import { ReportGroup } from '&app/core/domain/ReportGroup';

import { ReportJobPayload } from './ReportJobPayload';

@Injectable()
export class ReportSetupManager implements OnApplicationBootstrap {
  private EVERY_DAY = { cron: '0 12 * * *' };

  constructor(
    @InjectQueue(USER_REPORT_QUEUE)
    private readonly userReportQueue: Queue<ReportJobPayload>,
    @InjectQueue(USAGE_REPORT_QUEUE)
    private readonly usageReportQueue: Queue<ReportJobPayload>,
  ) {}

  async onApplicationBootstrap() {
    await Promise.all([
      this.userReportQueue.add(
        { group: ReportGroup.Day },
        {
          jobId: USER_REPORT_QUEUE,
          repeat: this.EVERY_DAY,
        },
      ),
      // this.usageReportQueue.add({ group: ReportGroup.Day }, {
      //     jobId: USAGE_REPORT_QUEUE,
      //     repeat: this.EVERY_DAY,
      // })
    ]);
  }
}
