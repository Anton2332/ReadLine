import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOwnBookFileRequestDto {
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value && value.book)
  book: Express.Multer.File[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value && value.image)
  image: Express.Multer.File[];
}
