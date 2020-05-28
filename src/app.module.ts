import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { ConfigModule } from './external/config.module';

@Module({
  imports: [
    ConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
