import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
import { PrismaModule } from '../../db/prisma.module';

@Module({
  // providers: [AuthService],
  // controllers: [AuthController],
  imports: [PrismaModule]
  // exports: [AuthService]
})
export class AuthModule {}
