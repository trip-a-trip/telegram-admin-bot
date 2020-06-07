import { TelegramActionHandler, Context } from 'nest-telegram';
import { CollaborationClient } from '@trip-a-trip/lib';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ModerationHandler {
  constructor(private readonly collaboration: CollaborationClient) {}

  @TelegramActionHandler({ on: ['callback_query'] })
  async moderate(ctx: Context) {
    if (!ctx.callbackQuery || !ctx.callbackQuery.data) {
      throw new Error('Okay');
    }

    const { approve, id } = JSON.parse(ctx.callbackQuery.data);

    await this.collaboration.moderate(approve, id, '');

    await ctx.editMessageReplyMarkup({ inline_keyboard: [[]] });

    if (approve) {
      await ctx.reply('Добавил в базу 👏');
    } else {
      await ctx.reply('Ок, отклоняем 💆');
    }
  }
}
