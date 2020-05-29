import { TimeReport } from './TimeReport';
import { ProgressReport } from './ProgressReport';

export class UserReport {
  constructor(readonly progress: ProgressReport, readonly time: TimeReport) {}
}
