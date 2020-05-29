import { Injectable } from '@nestjs/common';

import { UserReport } from '&app/core/domain/UserReport';

import { Template } from './Template';

@Injectable()
export class UserReportTemplate extends Template<UserReport> {
  async render({ progress }: UserReport) {
    const lines = ['Отчётик 💁\n'];

    if (progress.isChanged) {
      lines.push(
        `Теперь у нас *${progress.newValue}* пользователей (было ${progress.oldValue})`,
        `\n*${this.formatPercentage(progress.increasePercentage)}*`,
      );
    } else {
      lines.push('Новый пользователей нет 😥');
    }

    return lines.join('\n');
  }
}
