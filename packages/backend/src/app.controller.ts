import { Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from '@prisma';

@Controller('/')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async find() {
    return this.prisma.user.findMany();
  }

  @Post()
  async create() {
    return this.prisma.user.create({ data: { email: 'test@gamil.com', password: 'test' } });
  }
}
