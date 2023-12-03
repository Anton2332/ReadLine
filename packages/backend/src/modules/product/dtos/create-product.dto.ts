import { ApiProperty } from '@nestjs/swagger';
import { ageLimitType, rootType, statusType } from '@prisma/client';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  originalTitle: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsEnum(rootType)
  @IsNotEmpty()
  rootType: rootType;

  @ApiProperty()
  @IsEnum(statusType)
  @IsNotEmpty()
  status: statusType;

  @ApiProperty()
  @IsEnum(ageLimitType)
  @IsNotEmpty()
  ageLimit: ageLimitType;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  genreIds: string[];

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  tags: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  originalLanguageId: string;
}
