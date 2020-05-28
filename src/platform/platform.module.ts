import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserClient } from '@trip-a-trip/lib';

import { ConfigModule } from '&app/external/config.module';

import { coreUserProvider } from './coreUserProvider';

@Module({
  imports: [ConfigModule],
  providers: [coreUserProvider],
  exports: [UserClient],
})
export class PlatformModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
