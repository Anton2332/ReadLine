import { ApiProperty } from '@nestjs/swagger';
import { fileType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateOwnBookRequestDto {
  @ApiProperty()
  @IsEnum(fileType)
  @IsNotEmpty()
  contentType: fileType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  author: string;
}
