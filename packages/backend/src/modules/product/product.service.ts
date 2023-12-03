import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { Prisma } from '@prisma/client';
import { ICreateProduct } from './types/create-product.type';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getOne(where: Prisma.productWhereInput) {
    return this.prisma.product.findFirst({ where });
  }

  async getMany(where: Prisma.productWhereInput) {
    return this.prisma.product.findMany({ where });
  }

  async create(data: Prisma.productCreateInput) {
    return this.prisma.product.create({ data });
  }

  async createWithConnection(requestData: ICreateProduct) {
    const { genreIds, originalLanguageId, tags, ...rest } = requestData;
    return this.prisma.product.create({
      data: {
        ...rest,
        originalLanguage: {
          connect: {
            id: originalLanguageId
          }
        },
        genres: {
          connect: genreIds.map((it) => ({ id: it }))
        },
        tags: {
          connectOrCreate: tags.map((it) => ({
            where: {
              name: it
            },
            create: {
              name: it
            }
          }))
        }
      }
    });
  }
}
