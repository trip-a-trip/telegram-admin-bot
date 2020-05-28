import { InjectEntityManager } from '@nestjs/typeorm';
import { UserClient } from '@trip-a-trip/lib';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { UserReport } from '../domain/UserReport';
import { ReportGroup } from '../domain/ReportGroup';
import { TimeReport } from '../domain/TimeReport';
import { UserHistory } from '../domain/UserHistory.entity';
import { Historian } from '../infrastructure/Historian';

@Injectable()
export class UserReporter {
  constructor(
    @InjectEntityManager()
    private readonly em: EntityManager,
    private readonly users: UserClient,
    private readonly historian: Historian,
  ) {}

  async report(group: ReportGroup): Promise<UserReport> {
    const time = TimeReport.previousGroup(group);

    const [oldHistory, newCount] = await Promise.all([
      this.historian.findUserHistory(),
      this.users.getCount(),
    ]);

    const newHistory = new UserHistory(time.start, newCount);
    await this.em.save(newHistory);

    const oldCount = oldHistory ? oldHistory.count : 0;
    return new UserReport(oldCount, newCount, time);
  }
}
