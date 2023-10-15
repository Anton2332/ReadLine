import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TrimMiddleware } from './modules/common/middlewares/trim.middleware';
import { CommonModule } from './modules/common/common.module';
import { PrismaModule } from './db/prisma.module';

@Module({
  imports: [CommonModule, PrismaModule],
  controllers: [AppController]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(...[TrimMiddleware]).forRoutes('/');
  }
}
