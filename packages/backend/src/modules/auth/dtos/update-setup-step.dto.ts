import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateSetupStepDto {
  @ApiProperty()
  @IsNumber()
  setupStep: number;
}
