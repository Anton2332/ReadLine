import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from '../../db/prisma.module';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [PrismaModule, UserModule],
  exports: [AuthService]
})
export class AuthModule {}
