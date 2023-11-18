import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseAuthService } from '@services/base-auth.service';
import { EmailService } from '@services/email.service';
import { UserService } from '../user/user.service';
import { ErrorMessages, IUserLogin, IUserRegister, IUserResponse } from './types/auth.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly baseuserService: BaseAuthService
  ) {}

  async registerUser({ redirectUri, email, password }: IUserRegister) {
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
  }

  async verifyEmail(authToken: string): Promise<IUserResponse> {
    const { email, password } = await this.baseuserService.verifyToken<IUserLogin>(authToken);

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

    return { ...user, accessToken, refreshToken };
  }

  async loginUser(loginUser: IUserLogin): Promise<IUserResponse> {
    const user = await this.userService.verifyUser(loginUser);

    const { accessToken, refreshToken } = await this.baseuserService.generateTokens({
      id: user.id,
      email: user.email,
      role: user.role
    });

    return { ...user, accessToken, refreshToken };
  }

  async refreshToken(token: string): Promise<string> {
    const { id, email, role } = await this.baseuserService.verifyToken<{ id: string; email: string; role: string }>(token);

    const { token: accessToken } = await this.baseuserService.generateAccessToken({ id, email, role });

    return accessToken;
  }
}
