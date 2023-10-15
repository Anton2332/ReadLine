import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { EMAIL_MATCH } from 'src/modules/common/constants';

export class RecoverPasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(EMAIL_MATCH)
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  redirectUri: string;
}
