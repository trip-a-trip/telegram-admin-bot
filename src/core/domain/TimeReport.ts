import { subDays, startOfDay, endOfDay, Interval } from 'date-fns';

import { ReportGroup } from './ReportGroup';

export class TimeReport implements Interval {
  constructor(
    readonly group: ReportGroup,
    readonly start: Date,
    readonly end: Date,
  ) {}

  previous() {
    return TimeReport.previousGroup(this.group, this.start);
  }

  static previousGroup(group: ReportGroup, now = new Date()): TimeReport {
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
