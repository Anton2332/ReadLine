import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/db/prisma.module';
import { OwnBooksService } from './own-books.service';
import { OwnBooksController } from './own-books.controller';

@Module({
  imports: [PrismaModule],
  providers: [OwnBooksService],
  controllers: [OwnBooksController]
})
export class OwnBooksModule {}
