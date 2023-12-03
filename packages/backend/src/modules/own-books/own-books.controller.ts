import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadFileService } from '@services/upload-file.service';
import { fileType } from '@prisma/client';
import { OwnBooksService } from './own-books.service';
import { JWTAuthGuard } from '../common/guards';
import { User } from '../common/decorators';
import { IUserFromTocken } from '../auth/types/auth.type';
import { CreateOwnBookRequestDto } from './dtos/create-own-book.dto';
import { OWN_BOOKS_TAKE_COUNT } from './own-books.const';
import { CreateOwnBookFileRequestDto } from './dtos/create-own-book-file.dto';
import { UpdateLocationIndexRequestDto } from './dtos/update-location-own-book.dto';
import { PaginationQueryParamsDto } from './dtos/pagination-query-param.dto';
import { UpdateOwnBookRequestDto } from './dtos/update-own-book.dto';
import { UpdateOwnBookFileRequestDto } from './dtos/update-own-book-file.dto';

@Controller('own-books')
@UseGuards(JWTAuthGuard)
export class OwnBooksController {
  constructor(
    private readonly ownBookService: OwnBooksService,
    private readonly uploadFile: UploadFileService
  ) {}

  @Get()
  async getOwnBooks(@User() user: IUserFromTocken, @Query() { page, take, orderBy }: PaginationQueryParamsDto) {
    return this.ownBookService.getOwnBooksWithPagination({
      where: { userId: user.id },
      page: +(page ?? 0),
      take: +(take ?? OWN_BOOKS_TAKE_COUNT),
      orderBy
    });
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    await this.ownBookService.updateOne({ where: { id }, data: { lastOpenDate: new Date() } });
    return this.ownBookService.getOne({ id });
  }

  @Put(':id')
  async updateLocation(@Param('id') id: string, @Body() data: UpdateLocationIndexRequestDto) {
    return this.ownBookService.updateOne({ where: { id }, data: { locationIndex: data.locationIndex } });
  }

  @Put('update/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'book', maxCount: 1 },
      { name: 'image', maxCount: 1 }
    ])
  )
  async updateOwnBook(@Param('id') id: string, @Body() body: UpdateOwnBookRequestDto, @UploadedFiles() files: UpdateOwnBookFileRequestDto) {
    const ownBook = await this.ownBookService.getOne({ id });

    const book = files.book?.at(0);
    const image = files.image?.at(0);

    let contentUrl;
    if (book) {
      contentUrl = await this.uploadFile.uploadBook({
        fileName: `own-books/${ownBook.id}-${book.originalname}`,
        file: book.buffer,
        fileTypeData: fileType.EPUB
      });
    }

    let imageUrl;
    if (image) {
      imageUrl = await this.uploadFile.uploadImage({
        fileName: `own-books/images/${ownBook.id}-${image.originalname}`,
        file: image.buffer
      });
    }
    const data = { ...(contentUrl ? { contentUrl } : {}), ...(imageUrl ? { imageUrl } : {}) };
    return this.ownBookService.updateOne({
      where: { id: ownBook.id },
      data: { ...data, ...body }
    });
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'book', maxCount: 1 },
      { name: 'image', maxCount: 1 }
    ])
  )
  async uploadOwnBook(
    @User() user: IUserFromTocken,
    @Body() body: CreateOwnBookRequestDto,
    @UploadedFiles() files: CreateOwnBookFileRequestDto
  ) {
    const book = files.book[0];
    const image = files.image[0];

    const ownBook = await this.ownBookService.createOne({
      userId: user.id,
      contentType: body.contentType,
      title: body.title,
      author: body.author
    });

    const contentUrl = await this.uploadFile.uploadBook({
      fileName: `own-books/${ownBook.id}-${book.originalname}`,
      file: book.buffer,
      fileTypeData: fileType.EPUB
    });

    const imageUrl = await this.uploadFile.uploadImage({
      fileName: `own-books/images/${ownBook.id}-${image.originalname}`,
      file: image.buffer
    });

    return this.ownBookService.updateOne({ where: { id: ownBook.id }, data: { contentUrl, imageUrl } });
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.ownBookService.deleteOne({ id });
  }
}
