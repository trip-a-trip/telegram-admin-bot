import { Injectable } from '@nestjs/common';
import { TelegramActionHandler } from 'nest-telegram';

@Injectable()
export class HelloHandler {
  @TelegramActionHandler({ onStart: true })
  async onStart() {
    console.log('HELLO');
  }
}
