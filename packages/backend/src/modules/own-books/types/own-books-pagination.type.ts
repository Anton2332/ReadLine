import { ownFile } from '@prisma/client';

export interface IOwnBooksPagination {
  data: ownFile[];
  hasNextPage: boolean;
}
