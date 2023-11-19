import { Controller } from '@nestjs/common';
import { PrismaService } from '@prisma';

@Controller('/')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}
}
