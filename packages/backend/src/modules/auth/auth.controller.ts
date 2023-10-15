import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { EmailService } from '@services/email.service';
import { CookieOptions, Request, Response } from 'express';
import { BaseAuthService } from '@services/base-auth.service';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { ErrorMessages, IUserInvitedBy, IUserResponse } from './types/auth.type';
import { COOKIE_TOKEN_KEY } from '../common/constants';
import { JWTAuthGuard } from '../common/guards';
import { LoginRequestDto } from './dtos/login-request.dto';
import { User } from '../common/decorators';
import { AllExceptionFilter, HttpExceptionFilter } from '../common/filters';
import { UserService } from '../user/user.service';

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
  constructor(
    private readonly userService: UserService,
    private readonly baseuserService: BaseAuthService,
    private readonly emailService: EmailService
  ) {}

  @Get('me')
  @UseGuards(JWTAuthGuard)
  async getMe(@Req() req: Request, @Res() res: Response, @User() userFromToken: IUserResponse) {
    const { token: accessToken } = await this.baseuserService.generateAccessToken({
      id: userFromToken.id,
      email: userFromToken.email,
      role: userFromToken.role
    });

    const user = await this.userService.user({ email: userFromToken.email });
    res.status(200).json({ ...user, accessToken });
  }

  @Post('register')
  async signup(@Body() createUserDto: RegisterRequestDto, @Res() res: Response) {
    const { redirectUri, email, password } = createUserDto;

    const userIsExistWithThisEmail = await this.userService.userIsExist({ email });

    if (userIsExistWithThisEmail) {
      throw new HttpException(ErrorMessages.USER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
    }

    const { token } = await this.baseuserService.generateAccessToken({
      password,
      email
    });

    const url = `${redirectUri}?token=${token}`;
    const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

    await this.emailService.sendMail({
      to: email,
      subject: 'Email confirmation',
      text
    });

    res.status(200).end();
  }

  @Post('verify')
  async verify(@Body('token') authToken: string, @Res() res: Response) {
    const { email, password } = await this.baseuserService.verifyToken<IUserInvitedBy>(authToken);

    const user = await this.userService.createUser({ email, password });

    const { token: accessToken } = await this.baseuserService.generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role
    });
    const { token: refreshToken } = await this.baseuserService.generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    res.status(201).json({ ...user, accessToken, refreshToken });
  }

  @Post('signin')
  async signin(@Body() loginRequestDto: LoginRequestDto, @Res() res: Response) {
    const user = await this.userService.verifyUser(loginRequestDto);

    const { accessToken, refreshToken } = await this.baseuserService.generateTokens({
      id: user.id,
      email: user.email,
      role: user.role
    });

    res.cookie(COOKIE_TOKEN_KEY, refreshToken, cookieOptions);

    res.status(200).json({ ...user, accessToken, refreshToken });
  }

  @Get('refresh')
  async refreshAccessToken(@Req() req: Request, @Res() res: Response) {
    const token = req?.cookies[COOKIE_TOKEN_KEY];
    Logger.log({ token });

    const { id, email, role } = await this.baseuserService.verifyToken<{ id: string; email: string; role: string }>(token);

    const { token: accessToken } = await this.baseuserService.generateAccessToken({ id, email, role });
    return res.status(200).json({ accessToken }).end();
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie(COOKIE_TOKEN_KEY, cookieOptions);
    res.status(200).end();
  }
}
