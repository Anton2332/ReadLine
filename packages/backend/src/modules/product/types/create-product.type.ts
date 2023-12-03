import { ageLimitType, rootType, statusType } from '@prisma/client';

export interface ICreateProduct {
  originalTitle: string;

  description: string;

  rootType: rootType;

  status: statusType;

  ageLimit: ageLimitType;

  genreIds: string[];

  tags: string[];

  originalLanguageId: string;
}
