import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository, Between } from 'typeorm';
import { Interval } from 'date-fns';

import { UserHistory } from '../domain/UserHistory.entity';

@Injectable()
export class Historian {
  constructor(
    @InjectRepository(UserHistory)
    private readonly userRepo: Repository<UserHistory>,
  ) {}

  async findUserHistory(): Promise<UserHistory | null> {
    const history = await this.userRepo
      .createQueryBuilder('user')
      .orderBy('date', 'DESC')
      .getOne();

    return history || null;
  }
}
