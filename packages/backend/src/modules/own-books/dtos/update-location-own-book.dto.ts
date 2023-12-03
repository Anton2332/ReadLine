import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateLocationIndexRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  locationIndex: string;
}
