// import {
//   BadRequestException,
//   Body,
//   Controller,
//   Delete,
//   Get,
//   HttpException,
//   HttpStatus,
//   Logger,
//   NotFoundException,
//   Param,
//   Patch,
//   Post,
//   Req,
//   Res,
//   UseFilters,
//   UseGuards
// } from '@nestjs/common';
// import { BaseAuthService } from '@services/base-auth.service';
// import { EmailService } from '@services/email.service';
// import { CookieOptions, Request, Response } from 'express';
// import { RegisterRequestDto } from './dtos/register-request.dto';
// import { ErrorMessages, IUserInvitedBy, IUserResponse } from './types/auth.type';
// import { COOKIE_TOKEN_KEY } from '../common/constants';
// import { AllExceptionFilter } from './exception.filter';
// import { JWTAuthGuard } from '../common/guards';
// import { LoginRequestDto } from './dtos/login-request.dto';
// import { HttpExceptionFilter } from './http-exception.filter';
// import { RecoverPasswordDto } from './dtos/recover-password.dto';
// import { UpdatePasswordDto } from './dtos/update-password.dto';
// import { User } from '../common/decorators';
// import { UpdateSetupStepDto } from './dtos/update-setup-step.dto';
// import { PasswordlessRequestDto } from './dtos/passwordless-request.dto';
// import { CharactersLoginDto } from './dtos/characters-login.dto';

// const cookieOptions: CookieOptions = {
//   httpOnly: true,
//   maxAge: 14 * 24 * 60 * 60 * 1000,
//   secure: process.env.NODE_ENV !== 'dev',
//   path: '/',
//   sameSite: process.env.NODE_ENV === 'dev' ? 'lax' : 'none' // remove none when we move backend to subdomain
// };

// @Controller('auth')
// @UseFilters(HttpExceptionFilter)
// @UseFilters(AllExceptionFilter)
// export class AuthController {
//   constructor(
//     // private readonly authService: AuthService,
//     private readonly baseAuthService: BaseAuthService,
//     private readonly emailService: EmailService
//   ) {}

//   @Get()
//   async getUsers(@Res() res: Response) {
//     const users = this.authService.users({});
//     res.status(200).json(users).end();
//   }

//   @Get('me')
//   @UseGuards(JWTAuthGuard)
//   async getMe(@Req() req: Request, @Res() res: Response, @User() userFromToken: IUserResponse) {
//     const { token: accessToken } = await this.baseAuthService.generateAccessToken({
//       id: userFromToken.id,
//       email: userFromToken.email,
//       role: userFromToken.role
//     });

//     const user = await this.authService.user({ email: userFromToken.email });
//     res.status(200).json({ ...user, accessToken });
//   }

//   @Patch('me')
//   @UseGuards(JWTAuthGuard)
//   async updateSetupStep(@User() user: IUserResponse, @Body() updateSetupStepDto: UpdateSetupStepDto) {
//     return this.authService.updateSetupStep({
//       email: user.email,
//       setupStep: updateSetupStepDto.setupStep
//     });
//   }

//   @Post('register')
//   async signup(@Body() createUserDto: RegisterRequestDto, @Res() res: Response) {
//     const { redirectUri, email, password } = createUserDto;

//     const userIsExistWithThisEmail = await this.authService.userIsExist({ email });

//     if (userIsExistWithThisEmail) {
//       throw new HttpException(ErrorMessages.USER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
//     }

//     const invitedByUser = createUserDto?.invitedBy
//       ? await this.baseAuthService.verifyToken<{ id: string }>(createUserDto?.invitedBy)
//       : undefined;
//     const { token } = await this.baseAuthService.generateAccessToken({
//       password,
//       email,
//       ...(invitedByUser?.id && { invitedBy: invitedByUser.id })
//     });

//     const url = `${redirectUri}?token=${token}`;
//     const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

//     await this.emailService.sendMail({
//       to: email,
//       subject: 'Email confirmation',
//       text
//     });

//     res.status(200).end();
//   }

//   @Post('verify')
//   async verify(@Body('token') authToken: string, @Res() res: Response) {
//     const { email, password, invitedBy } = await this.baseAuthService.verifyToken<IUserInvitedBy>(authToken);

//     const user = await this.authService.createUser({ email, password });

//     if (invitedBy) {
//       await this.authService.addConnection({ targetId: invitedBy, sourceId: user.id });
//     }

//     const { token: accessToken } = await this.baseAuthService.generateAccessToken({
//       id: user.id,
//       email: user.email,
//       role: user.role
//     });
//     const { token: refreshToken } = await this.baseAuthService.generateRefreshToken({
//       id: user.id,
//       email: user.email,
//       role: user.role
//     });

//     res.status(201).json({ ...user, accessToken, refreshToken });
//   }

//   @Delete(':id')
//   async deleteUser(@Param('id') userId: string, @Res() res: Response) {
//     const removedUser = this.authService.deleteUser({ id: String(userId) });
//     res.status(200).json(removedUser).end();
//   }

//   @Post('signin')
//   async signin(@Body() loginRequestDto: LoginRequestDto, @Res() res: Response) {
//     const user = await this.authService.verifyUser(loginRequestDto);

//     const { accessToken, refreshToken } = await this.baseAuthService.generateTokens({
//       id: user.id,
//       email: user.email,
//       role: user.role
//     });

//     res.cookie(COOKIE_TOKEN_KEY, refreshToken, cookieOptions);

//     res.status(200).json({ ...user, accessToken, refreshToken });
//   }

//   @Post('email-characters-signin/send')
//   async emailCharactersSigninSend(@Body() dto: PasswordlessRequestDto) {
//     const user = await this.authService.userIsExist({ email: dto.email });
//     if (!user) {
//       throw new NotFoundException();
//     }
//     await this.authService.setLoginCode(dto.email);
//     return true;
//   }

//   @Post('email-characters-signin/confirm')
//   async emailCharactersSigninConfirm(@Body() dto: CharactersLoginDto, @Res() res: Response) {
//     const isValid = await this.authService.checkLoginCode(dto);
//     if (!isValid) {
//       throw new BadRequestException('The code is either invalid or has expired');
//     }
//     const user = await this.authService.user({ email: dto.email });
//     const { accessToken, refreshToken } = await this.baseAuthService.generateTokens({ id: user.id, email: user.email, role: user.role });

//     res.cookie(COOKIE_TOKEN_KEY, refreshToken, cookieOptions);
//     res.status(200).json({ ...user, accessToken, refreshToken });
//   }

//   @Post('signin-admin')
//   async signinAdmin(@Body() loginRequestDto: LoginRequestDto, @Res() res: Response) {
//     const user = await this.authService.verifyUser(loginRequestDto, true);

//     const { token: accessToken } = await this.baseAuthService.generateAccessToken({
//       id: user.id,
//       email: user.email,
//       role: user.role
//     });
//     const { token: refreshToken } = await this.baseAuthService.generateRefreshToken({
//       id: user.id,
//       email: user.email,
//       role: user.role
//     });

//     res.status(200).json({ ...user, accessToken, refreshToken });
//   }

//   @Post('recover-password')
//   async recoverPassword(@Body() recoverPasswordDto: RecoverPasswordDto, @Res() res: Response) {
//     const { email, redirectUri } = recoverPasswordDto;
//     const isExist = this.authService.userIsExist({ email });

//     if (!isExist) {
//       throw new HttpException(ErrorMessages.WRONG_USER_CREDENTIALS, HttpStatus.NOT_FOUND);
//     }

//     const { token } = await this.baseAuthService.generateAccessToken({ email });

//     const url = `${redirectUri}?token=${token}`;
//     const text = `To recover password, click here: ${url}`;

//     await this.emailService.sendMail({
//       to: email,
//       subject: 'Recover Password',
//       text
//     });

//     res.status(200).end();
//   }

//   @Patch('recover-password')
//   async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @Res() res: Response) {
//     const { token, password } = updatePasswordDto;
//     const { email } = await this.baseAuthService.verifyToken<{ email: string }>(token);
//     const user = this.authService.updatePassword({ email, password });

//     res.status(200).json(user).end();
//   }

//   @Post('invitation-link')
//   @UseGuards(JWTAuthGuard)
//   async invitationLink(@Body() data: { baseUrl: string }, @Req() req: Request, @Res() res: Response, @User() user: IUserResponse) {
//     const { token: invitedBy } = await this.baseAuthService.generateAccessToken({ id: user.id });

//     return res
//       .status(200)
//       .json({ link: `${data.baseUrl}?invitedBy=${invitedBy}` })
//       .end();
//   }

//   @Get('set-cookie')
//   async setCookie(@Res({ passthrough: true }) response: Response) {
//     response.cookie('my-cookie', 'somewefwefwe content', cookieOptions);
//   }

//   @Get('get-cookie')
//   async getCookie(@Req() req: Request) {
//     return req.cookies;
//   }

//   @Get('refresh')
//   async refreshAccessToken(@Req() req: Request, @Res() res: Response) {
//     const token = req?.cookies[COOKIE_TOKEN_KEY];
//     Logger.log({ token });

//     const { id, email, role } = await this.baseAuthService.verifyToken<{ id: string; email: string; role: string }>(token);

//     const { token: accessToken } = await this.baseAuthService.generateAccessToken({ id, email, role });
//     return res.status(200).json({ accessToken }).end();
//   }

//   @Get('logout')
//   async logout(@Res() res: Response) {
//     res.clearCookie(COOKIE_TOKEN_KEY, cookieOptions);
//     res.status(200).end();
//   }
// }
