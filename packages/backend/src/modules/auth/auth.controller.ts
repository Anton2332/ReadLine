import { Body, Controller, Get, Logger, Post, Req, Res, UseFilters } from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { COOKIE_TOKEN_KEY } from '../common/constants';
import { LoginRequestDto } from './dtos/login-request.dto';
import { AllExceptionFilter, HttpExceptionFilter } from '../common/filters';
import { AuthService } from './auth.service';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  maxAge: 14 * 24 * 60 * 60 * 1000,
  secure: process.env.NODE_ENV !== 'dev',
  path: '/',
  sameSite: process.env.NODE_ENV === 'dev' ? 'lax' : 'none' // remove none when we move backend to subdomain
};

@Controller('auth')
@UseFilters(HttpExceptionFilter)
@UseFilters(AllExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async signup(@Body() createUserDto: RegisterRequestDto, @Res() res: Response) {
    await this.authService.registerUser(createUserDto);

    res.status(200).end();
  }

  @Post('verify')
  async verify(@Body('token') authToken: string) {
    return this.authService.verifyEmail(authToken);
  }

  @Post('signin')
  async signin(@Body() loginRequestDto: LoginRequestDto, @Res() res: Response) {
    const { refreshToken, ...rest } = await this.authService.loginUser(loginRequestDto);

    res.cookie(COOKIE_TOKEN_KEY, refreshToken, cookieOptions);

    return { ...rest, refreshToken };
  }

  @Get('refresh')
  async refreshAccessToken(@Req() req: Request, @Res() res: Response) {
    const token = req?.cookies[COOKIE_TOKEN_KEY];
    Logger.log({ token });

    const accessToken = await this.authService.refreshToken(token);
    return res.status(200).json({ accessToken }).end();
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie(COOKIE_TOKEN_KEY, cookieOptions);
    res.status(200).end();
  }
}
