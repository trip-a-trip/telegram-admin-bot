import { TimeReport } from './TimeReport';

export class UserReport {
  constructor(
    readonly oldCount: number,
    readonly newCount: number,
    readonly time: TimeReport,
  ) {}

  get increasePercentage(): number {
    return ((this.newCount - this.oldCount) / this.oldCount) * 100;
  }
}
