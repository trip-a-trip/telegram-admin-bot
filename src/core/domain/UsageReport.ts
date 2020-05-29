import { TimeReport } from './TimeReport';
import { ProgressReport } from './ProgressReport';

export class UsageReport {
  constructor(
    readonly seen: ProgressReport,
    readonly uniqUsers: ProgressReport,
    readonly uniqVenues: ProgressReport,
    readonly time: TimeReport,
  ) {}
}
