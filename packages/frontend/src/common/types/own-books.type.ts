export enum FileType {
  EPUB = 'EPUB',
  PDF = 'PDF',
  MOBe = 'MOBe'
}

export enum OrderByOwnBookEnum {
  LAST_OPEN = 'LAST_OPEN',
  FIRST_OPEN = 'FIRST_OPEN',
  FROM_A_TO_Z = 'FROM_A_TO_Z',
  FROM_Z_TO_A = 'FROM_Z_TO_A'
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
