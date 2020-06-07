import { Injectable } from '@nestjs/common';
import { DraftFields } from '@trip-a-trip/lib';
import { sample } from 'lodash';

import { Template } from './Template';

@Injectable()
export class ModerationRequestTemplate extends Template<DraftFields> {
  async render(fields: DraftFields) {
    const lines: Array<string | undefined | boolean> = [
      'Кто-то прислал новое место 🧑‍💻\n',
    ];

    const badges = [
      fields.isAmazing && 'isAmazing',
      fields.isExpensive && 'isExpensive',
    ].filter(Boolean);

    lines.push(
      `*Название*: ${fields.name}`,
      fields.description && `*Описание*: ${fields.description}`,
      `*Бейджы*: ${badges.join(', ')}`,
      `*Тип*: ${fields.kind.join(', ')}`,
      fields.links.length > 0 && `*Сссылки*:`,
      ...fields.links.map((link) => `  - ${link.title} — ${link.url}`),
      fields.address && `*Адрес*: ${fields.address}`,
      `*Координаты*:`,
      `  - Широта: ${fields.coordinates.latitude}`,
      `  - Долгота: ${fields.coordinates.longitude}`,
    );

    const funnyEmoji = ['🥑', '🧉', '🏝'];
    lines.push(`\nМодерируйте скорее ${sample(funnyEmoji)}`);

    return lines.join('\n');
  }
}
