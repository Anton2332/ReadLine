export enum FileType {
  EPUB = 'EPUB',
  PDF = 'PDF',
  MOBe = 'MOBe'
}

export enum OrderByOwnBookEnum {
  LAST_OPEN = 'LAST_OPEN',
  FIRST_OPEN = 'FIRST_OPEN',
  LAST_CREATED = 'LAST_CREATED',
  FIRST_CREATED = 'FIRST_CREATED'
}

export interface IOwnBook {
  id: string;
  title: string;
  author: string;
  imageUrl?: string;
  contentType: FileType;
  contentUrl: string;
  locationIndex?: string;
}

export interface IUpdateOwnBook {
  id: string;
  title?: string;
  author?: string;
  image?: File;
  contentType: FileType;
  book?: File;
}

export interface IUploadOwnBook {
  title: string;
  author: string;
  image: File;
  contentType: FileType;
  book: File;
}

export interface IUpdateLocationIndexInOwnBook {
  locationIndex: string;
}

export interface IPagetOwnBooks {
  data: IOwnBook[];
  hasNextPage: boolean;
}
