import { fileType } from '@prisma/client';

export interface ICreateOwnBook {
  contentType: fileType;
  title: string;
  author: string;
  userId: string;
}
