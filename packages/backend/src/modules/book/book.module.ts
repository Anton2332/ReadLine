import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/db/prisma.module';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [PrismaModule, CommonModule],
  providers: [BookService],
  controllers: [BookController]
})
export class BookModule {}
