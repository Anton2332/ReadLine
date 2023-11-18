import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { EMAIL_MATCH, PASSWORD_MATCH } from '../../common/constants';

export class RegisterRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(EMAIL_MATCH)
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(PASSWORD_MATCH)
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  redirectUri: string;
}
