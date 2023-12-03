import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { Prisma, group } from '@prisma/client';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.groupCreateInput): Promise<group> {
    return this.prisma.group.create({ data });
  }

  async getOne(where: Prisma.groupWhereInput): Promise<group> {
    return this.prisma.group.findFirst({ where });
  }

  async getMany(where: Prisma.groupWhereInput): Promise<group[]> {
    return this.prisma.group.findMany({ where });
  }
}
