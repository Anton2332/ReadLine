import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from '../../db/prisma.module';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  providers: [{ provide: 'AuthService', useClass: AuthService }, GoogleStrategy],
  controllers: [AuthController],
  imports: [PrismaModule, UserModule]
})
export class AuthModule {}
