export class ProgressReport {
  constructor(readonly oldValue: number, readonly newValue: number) {}

  get increasePercentage(): number {
    if (this.newValue === 0 && this.oldValue === 0) {
      return 0;
    }

    return ((this.newValue - this.oldValue) / this.oldValue) * 100;
  }

  get isChanged(): boolean {
    return this.oldValue !== this.newValue;
  }
}
