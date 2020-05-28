import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('user_history')
export class UserHistory {
  @PrimaryColumn({ name: 'date' })
  date: Date;

  @Column({ name: 'count' })
  count: number;

  constructor(date: Date, count: number) {
    this.date = date;
    this.count = count;
  }
}
