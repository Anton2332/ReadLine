import { INestApplication, Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    // @Inject(forwardRef(() => AlgoliaService)) private readonly algoliaService: AlgoliaService
    super({
      log: [
        // { emit: 'stdout', level: 'query' },
        // { emit: 'stdout', level: 'info' },
        // { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' }
      ]
    });
    try {
      // setupUserHooksForAlgolia(this, this.algoliaService);
    } catch (err) {
      Logger.error(err);
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
