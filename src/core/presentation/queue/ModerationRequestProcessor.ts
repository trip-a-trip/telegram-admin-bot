import { MODERATION_REQUEST_QUEUE, Draft } from '@trip-a-trip/lib';
import { Configuration } from '@solid-soda/config';
import { Processor, Process } from '@nestjs/bull';
import { TelegramClient } from 'nest-telegram';
import { Job } from 'bull';

import { ModerationRequestTemplate } from '../template/ModerationRequestTemplate';

@Processor(MODERATION_REQUEST_QUEUE)
export class ModerationRequestProcessor {
  private readonly chatId: string;

  constructor(
    private readonly template: ModerationRequestTemplate,
    private readonly telegram: TelegramClient,
    config: Configuration,
  ) {
    this.chatId = config.getStringOrThrow('TEAM_CHAT_ID');
  }

  @Process()
  async handleModerationRequest(job: Job<Draft>) {
    try {
      const message = await this.template.render(job.data.fields);

      const collbackData = (approve: boolean) =>
        JSON.stringify({ id: job.data.id, approve });

      await this.telegram.sendMarkdown(this.chatId, message, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '🟢 апрув', callback_data: collbackData(true) },
              { text: '🔴 нафиг', callback_data: collbackData(false) },
            ],
          ],
        },
      });

      await job.moveToCompleted();
    } catch (error) {
      console.log(error);
      await job.moveToFailed(error);
    }
  }
}
