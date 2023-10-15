import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { EmailService } from '@services/email.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly emailService: EmailService
  ) {}
}
