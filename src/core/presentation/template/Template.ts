export abstract class Template<T> {
  abstract render(data: T): Promise<string>;

  protected formatPercentage(percentage: number): string {
    const prefix = percentage > 0 ? '+' : '';

    return `${prefix}${Math.round(percentage)} %`;
  }
}
