import { Injectable } from '@nestjs/common';

import { UserReport } from '&app/core/domain/UserReport';

import { Template } from './Template';

@Injectable()
export class UserReportTemplate implements Template<UserReport> {
  async render(data: UserReport) {
    const lines = ['Отчетик 💁\n'];

    if (data.oldCount === data.newCount) {
      lines.push('Новый пользователей нет 😥');
    } else {
      lines.push(
        `Теперь у нас *${data.newCount}* пользователей (было ${data.oldCount})`,
        `\n*+${Math.round(data.increasePercentage)} %*`,
      );
    }

    return lines.join('\n');
  }
}
