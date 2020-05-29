import { Injectable } from '@nestjs/common';
import { EatClient } from '@trip-a-trip/lib';
import { uniqBy } from 'lodash';

import { ReportGroup } from '../domain/ReportGroup';
import { TimeReport } from '../domain/TimeReport';
import { UsageReport } from '../domain/UsageReport';
import { ProgressReport } from '../domain/ProgressReport';

@Injectable()
export class UsageReporter {
  constructor(private readonly eat: EatClient) {}

  async report(group: ReportGroup): Promise<UsageReport> {
    const time = TimeReport.previousGroup(group);

    const [prev, cur] = await Promise.all([
      this.getStat(time),
      this.getStat(time.previous()),
    ]);

    const seen = new ProgressReport(prev.count, cur.count);
    const uniqUsers = new ProgressReport(prev.uniqUsers, cur.uniqUsers);
    const uniqVenues = new ProgressReport(prev.uniqVenus, cur.uniqVenus);

    return new UsageReport(seen, uniqUsers, uniqVenues, time);
  }

  private async getStat(time: TimeReport) {
    const seen = await this.eat.fetchHistory(time.start, time.end);

    return {
      count: seen.length,
      uniqUsers: uniqBy(seen, (item) => item.userId).length,
      uniqVenus: uniqBy(seen, (item) => item.venueId).length,
    };
  }
}
