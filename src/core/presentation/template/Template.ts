export interface Template<T> {
  render(data: T): Promise<string>;
}
