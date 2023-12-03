import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { fileType } from '@prisma/client';
import Epub from 'epubjs';

@Injectable()
export class UploadFileService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_S3_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow('AWS_S3_SECRET_ACCESS_KEY')
    }
  });

  constructor(private readonly configService: ConfigService) {}

  async uploadBook({ fileName, file, fileTypeData }: { fileName: string; file: Buffer; fileTypeData: fileType }) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.getOrThrow('AWS_S3_BUCKET_NAME'),
        Key: fileName,
        Body: file,
        ContentType: fileTypeData.toLowerCase()
      })
    );

    return `https://${this.configService.getOrThrow('AWS_S3_BUCKET_NAME')}.s3.amazonaws.com/${fileName}`;
  }

  async uploadImage({ fileName, file }: { fileName: string; file: Buffer }) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.getOrThrow('AWS_S3_BUCKET_NAME'),
        Key: fileName,
        Body: file
      })
    );

    return `https://${this.configService.getOrThrow('AWS_S3_BUCKET_NAME')}.s3.amazonaws.com/${fileName}`;
  }

  async extractCover(epubFile: Buffer): Promise<string | null> {
    const epub = Epub(epubFile);
    let coverBuffer: string | null = null;
    coverBuffer = await epub.coverUrl();
    return coverBuffer;
  }
}
