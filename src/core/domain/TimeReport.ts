import { subDays, startOfDay, endOfDay, Interval } from 'date-fns';

import { ReportGroup } from './ReportGroup';

export class TimeReport implements Interval {
  constructor(
    readonly group: ReportGroup,
    readonly start: Date,
    readonly end: Date,
  ) {}

  static previousGroup(group: ReportGroup): TimeReport {
    const now = new Date();
    switch (group) {
      case ReportGroup.Day:
        return new TimeReport(
          group,
          startOfDay(subDays(now, 1)),
          endOfDay(subDays(now, 1)),
        );
      default:
        throw new Error('Unexpected report group');
    }
  }
}
