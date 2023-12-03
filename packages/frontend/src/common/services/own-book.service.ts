import {
  IOwnBook,
  IPagetOwnBooks,
  IUpdateLocationIndexInOwnBook,
  IUpdateOwnBook,
  IUploadOwnBook,
  OrderByOwnBookEnum
} from '../types/own-books.type';
import { axiosInstance } from './axios';
import { EnhancedWithAuthHttpService } from './http-auth.service';
import { HttpService } from './http.service';

class OwnBooksService extends EnhancedWithAuthHttpService {
  constructor() {
    super(new HttpService(axiosInstance));
  }

  getPagetOwnBooks(page: number, orderBy: OrderByOwnBookEnum) {
    return this.get<IPagetOwnBooks>(`own-books?page=${page}&orderBy=${orderBy}`);
  }

  getById(id: string) {
    return this.get<IOwnBook>(`own-books/${id}`);
  }

  updateLocationIndexById({ id, locationIndex }: { id: string; locationIndex: string }) {
    return this.put<IOwnBook, IUpdateLocationIndexInOwnBook>(`own-books/${id}`, { locationIndex });
  }

  updateOwnBook(data: IUpdateOwnBook) {
    const formData = new FormData();
    if (data.image) {
      formData.append('image', data.image);
    }
    if (data.book) {
      formData.append('book', data.book);
    }
    if (data.title) {
      formData.append('title', data.title);
    }
    if (data.author) {
      formData.append('author', data.author);
    }
    formData.append('contentType', data.contentType);
    return this.post<IOwnBook, FormData>('own-books', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  uploadOwnBook(data: IUploadOwnBook) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('contentType', data.contentType);
    formData.append('image', data.image);
    formData.append('book', data.book);
    return this.post<IOwnBook, FormData>('own-books', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  deleteOne(id: string) {
    return this.delete<IOwnBook>(`own-books/${id}`);
  }
}

export const ownBooksService = new OwnBooksService();
