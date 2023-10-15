import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { exclude } from '../common/utils';
import { ErrorMessages } from '../auth/types/auth.type';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async user(where: Prisma.userWhereUniqueInput) {
    const userData = await this.prisma.user.findUnique({
      where
    });
    return exclude(userData, ['password']);
  }

  async createUser(data: Prisma.userCreateInput) {
    data.password = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data
    });
    return exclude(user, ['password']);
  }

  async verifyUser(data: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email
      }
    });

    if (!user) {
      throw new HttpException(ErrorMessages.NEW_WRONG_USER_CREDENTIALS, HttpStatus.NOT_FOUND);
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      throw new HttpException(ErrorMessages.WRONG_EMAIL_OR_PASSWORD, HttpStatus.BAD_REQUEST);
    }

    return exclude(user, ['password']);
  }

  async userIsExist(where: Prisma.userWhereUniqueInput): Promise<boolean> {
    const findUser = await this.prisma.user.findUnique({ where });
    return !!findUser;
  }
}
