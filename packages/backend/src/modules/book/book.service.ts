import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}
}
