import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TrimMiddleware } from './modules/common/middlewares/trim.middleware';
import { CommonModule } from './modules/common/common.module';
import { PrismaModule } from './db/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { GroupModule } from './modules/group/group.module';
import { ProductModule } from './modules/product/product.module';
import { OwnBooksModule } from './modules/own-books/own-books.module';

@Module({
  imports: [CommonModule, PrismaModule, AuthModule, BookModule, GroupModule, ProductModule, OwnBooksModule]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(...[TrimMiddleware]).forRoutes('/');
  }
}
