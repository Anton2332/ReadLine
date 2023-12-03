import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OrderByOwnBookEnum } from '../types/order-by-own-book.type';

export class PaginationQueryParamsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  page: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  take: string;

  @ApiProperty()
  @IsEnum(OrderByOwnBookEnum)
  @IsNotEmpty()
  orderBy: OrderByOwnBookEnum;
}
