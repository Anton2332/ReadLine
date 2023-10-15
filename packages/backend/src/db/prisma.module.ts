import { Module } from '@nestjs/common';
// import { AlgoliaModule } from 'src/modules/algolia/algolia.module';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService]
  // imports: [forwardRef(() => AlgoliaModule)]
})
export class PrismaModule {}
