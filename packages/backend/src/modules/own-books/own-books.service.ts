import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { Prisma } from '@prisma/client';
import { ICreateOwnBook } from './types/create-own-book.type';
import { IOwnBooksPagination } from './types/own-books-pagination.type';
import { OrderByOwnBookEnum } from './types/order-by-own-book.type';
import { OrderByOwnBookConst } from './consts/order-by-own-book.const';

@Injectable()
export class OwnBooksService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOne(where: Prisma.ownFileWhereInput) {
    return this.prismaService.ownFile.findFirst({ where });
  }

  async getMany(where: Prisma.ownFileWhereInput) {
    return this.prismaService.ownFile.findMany({ where });
  }

  async createOne(data: ICreateOwnBook) {
    return this.prismaService.ownFile.create({ data });
  }

  async updateOne({ data, where }: { data: Prisma.ownFileUpdateInput; where: Prisma.ownFileWhereUniqueInput }) {
    return this.prismaService.ownFile.update({ data, where });
  }

  async getPagetData({
    where,
    page,
    take,
    orderBy
  }: {
    where: Prisma.ownFileWhereInput;
    page: number;
    take: number;
    orderBy: OrderByOwnBookEnum;
  }) {
    return this.prismaService.ownFile.findMany({ where, skip: page * take, take, orderBy: { ...OrderByOwnBookConst[orderBy] } });
  }

  async getOwnBooksWithPagination({
    where,
    page,
    take,
    orderBy
  }: {
    where: Prisma.ownFileWhereInput;
    page: number;
    take: number;
    orderBy: OrderByOwnBookEnum;
  }): Promise<IOwnBooksPagination> {
    const data = await this.getPagetData({ where, page, take, orderBy });

    const nextPageData = await this.getPagetData({ where, page: page + 1, take, orderBy });

    return {
      hasNextPage: !!nextPageData?.length,
      data
    };
  }

  async deleteOne(where: Prisma.ownFileWhereUniqueInput) {
    return this.prismaService.ownFile.delete({ where });
  }
}
