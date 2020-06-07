import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserClient, EatClient, CollaborationClient } from '@trip-a-trip/lib';

import { ConfigModule } from '&app/external/config.module';

import { coreUserProvider } from './coreUserProvider';
import { coreEatProvider } from './coreEatProvider';
import { coreCollaborationProvider } from './coreCollaborationProvider';

@Module({
  imports: [ConfigModule],
  providers: [coreUserProvider, coreEatProvider, coreCollaborationProvider],
  exports: [UserClient, EatClient, CollaborationClient],
})
export class PlatformModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
