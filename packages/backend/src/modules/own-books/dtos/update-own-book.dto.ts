import { ApiProperty } from '@nestjs/swagger';
import { fileType } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateOwnBookRequestDto {
  @ApiProperty()
  @IsEnum(fileType)
  @IsOptional()
  contentType: fileType;

  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  author: string;
}
