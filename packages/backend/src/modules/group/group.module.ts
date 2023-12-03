import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/db/prisma.module';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';

@Module({
  imports: [PrismaModule],
  providers: [GroupService],
  controllers: [GroupController]
})
export class GroupModule {}
