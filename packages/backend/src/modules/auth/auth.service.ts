// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { PrismaService } from '@prisma';
// import { Prisma } from '@prisma/client';
// import * as bcrypt from 'bcrypt';
// import { EmailService } from '@services/email.service';
// import { ErrorMessages } from './types/auth.type';
// import { exclude } from '../common/utils';
// import { CharactersLoginDto } from './dtos/characters-login.dto';

// @Injectable()
// export class AuthService {
//   constructor(private prisma: PrismaService, private readonly emailService: EmailService) {}

//   async user(where: Prisma.userWhereUniqueInput) {
//     const userData = await this.prisma.user.findUnique({
//       where
//     });
//     return exclude(userData, ['password']);
//   }

//   async userProfile(where: Prisma.profileWhereUniqueInput, include?: Prisma.profileInclude) {
//     return this.prisma.profile.findUnique({
//       where,
//       include
//     });
//   }

//   async users(params: {
//     skip?: number;
//     take?: number;
//     cursor?: Prisma.userWhereUniqueInput;
//     where?: Prisma.userWhereInput;
//     orderBy?: Prisma.userOrderByWithRelationInput;
//   }) {
//     const { skip, take, cursor, where, orderBy } = params;
//     return this.prisma.user.findMany({
//       skip,
//       take,
//       cursor,
//       where,
//       orderBy
//     });
//   }

//   async createUser(data: Prisma.userCreateInput) {
//     data.password = await bcrypt.hash(data.password, 10);
//     const user = await this.prisma.user.create({
//       data
//     });
//     return exclude(user, ['password']);
//   }

//   async verifyUser(data: Prisma.userCreateInput, isAdminVerifier = false) {
//     const user = await this.prisma.user.findUnique({
//       where: {
//         email: data.email
//       }
//     });

//     if (!user) {
//       throw new HttpException(ErrorMessages.NEW_WRONG_USER_CREDENTIALS, HttpStatus.NOT_FOUND);
//     }

//     const isValidPassword = await bcrypt.compare(data.password, user.password);
//     if (!isValidPassword) {
//       throw new HttpException(ErrorMessages.WRONG_EMAIL_OR_PASSWORD, HttpStatus.BAD_REQUEST);
//     }

//     if (isAdminVerifier && user.role !== Role.ADMIN) {
//       throw new HttpException(ErrorMessages.NOT_ENOUGH_PERMISSIONS, HttpStatus.FORBIDDEN);
//     }

//     return exclude(user, ['password']);
//   }

//   async deleteUser(where: Prisma.userWhereUniqueInput) {
//     return this.prisma.user.delete({
//       where,
//       select: {
//         id: true,
//         email: true,
//         role: true,
//         setupStep: true
//       }
//     });
//   }

//   async userIsExist(where: Prisma.userWhereUniqueInput): Promise<boolean> {
//     const user = await this.prisma.user.findUnique({
//       where
//     });
//     return !!user;
//   }

//   async updatePassword(data: Prisma.userCreateInput) {
//     const password = await bcrypt.hash(data.password, 10);
//     return this.prisma.user.update({
//       where: {
//         email: data.email
//       },
//       data: {
//         password,
//         updatedAt: new Date()
//       },
//       select: {
//         id: true,
//         email: true,
//         role: true,
//         setupStep: true
//       }
//     });
//   }

//   async updateSetupStep(data: { email: string; setupStep: number }) {
//     return this.prisma.user.update({
//       where: {
//         email: data.email
//       },
//       data: {
//         setupStep: data.setupStep,
//         updatedAt: new Date()
//       },
//       select: {
//         id: true,
//         email: true,
//         role: true,
//         setupStep: true
//       }
//     });
//   }

//   async setupStepToNull({ where, setupStep }: { where: Prisma.userWhereUniqueInput; setupStep: null | number }) {
//     return this.prisma.user.update({
//       where,
//       data: {
//         setupStep
//       }
//     });
//   }

//   async addConnection(data: { targetId: string; sourceId: string }) {
//     await this.prisma.connection.create({
//       data: {
//         targetId: data.targetId,
//         sourceId: data.sourceId,
//         userFriendly: UserFriendly.WELL,
//         opinionValue: OpinionValue.AVG,
//         isFollow: false
//       }
//     });
//   }

//   async setLoginCode(email: string) {
//     const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     const codeLength = 6;

//     const sixDigitCode = Array.from({ length: codeLength }, () => {
//       const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
//       return alphanumericChars.charAt(randomIndex);
//     }).reduce((code, char) => code + char, '');

//     const expirationTime = new Date();
//     expirationTime.setMinutes(expirationTime.getMinutes() + 5);

//     await this.emailService.sendMail({
//       to: email,
//       subject: `Sign-in code: ${sixDigitCode}`,
//       text: `Your sign-in code: ${sixDigitCode}`
//     });

//     await this.prisma.user.update({
//       where: { email },
//       data: {
//         loginCode: sixDigitCode,
//         loginCodeExpiresAt: expirationTime
//       }
//     });
//   }

//   async checkLoginCode(dto: CharactersLoginDto): Promise<boolean> {
//     const user = await this.prisma.user.findUnique({ where: { email: dto.email }, select: { loginCode: true, loginCodeExpiresAt: true } });
//     if (user) {
//       const currentTime = new Date();
//       const expirationTime = new Date(user.loginCodeExpiresAt);
//       if (currentTime <= expirationTime && user.loginCode === dto.code) {
//         return true;
//       }
//     }

//     return false;
//   }
// }
