import { Injectable } from '@nestjs/common';

import { UsageReport } from '&app/core/domain/UsageReport';
import { ProgressReport } from '&app/core/domain/ProgressReport';

import { Template } from './Template';

@Injectable()
export class UsageReportTemplate extends Template<UsageReport> {
  async render({ seen, uniqVenues }: UsageReport) {
    const lines = ['Отчётик 🌟\n'];

    const addMetric = (name: string, report: ProgressReport) => {
      lines.push(
        `*${name}*: ${report.newValue} (${this.formatPercentage(
          report.increasePercentage,
        )})\n`,
      );
    };

    addMetric('Мест просмотрено', seen);
    addMetric('Уникальных пользователей', uniqVenues);

    return lines.join('\n');
  }
}
