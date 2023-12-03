import { Controller, FileTypeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileType } from '@prisma/client';
import { UploadFileService } from '@services/upload-file.service';

@Controller('book')
export class BookController {
  constructor(private readonly uploadFile: UploadFileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('book'))
  async uploadBook(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'epub' })]
      })
    )
    book: Express.Multer.File
  ) {
    return this.uploadFile.uploadBook({ fileName: book.originalname, file: book.buffer, fileTypeData: fileType.EPUB });
  }
}
