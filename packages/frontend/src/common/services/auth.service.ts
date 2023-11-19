import { deleteCookie } from 'cookies-next';
import { HttpService } from './http.service';
import {
  IPasswordlessRequestPayload,
  IPasswordlessSendCodePayload,
  IRecoveryPayload,
  IRegisterUserPayload,
  ISetupPasswordPayload,
  ISignIn
} from '@/common/types/auth.type';
import { HEADERS_KEYS, STORAGE_KEYS } from '@/common/consts/app-keys.const';
import { axiosInstance } from '@/common/services/axios';
import { IUser, IUserPayload } from '../types/user.type';

class AuthService extends HttpService {
  constructor() {
    super(axiosInstance);
  }

  async signUp(payload: IRegisterUserPayload) {
    return this.post<void, IRegisterUserPayload>('auth/register', payload);
  }

  async signIn(payload: IUserPayload) {
    const response = await this.post<ISignIn, IUserPayload>('auth/signin', payload);
    if (response?.accessToken) {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
    }
    if (response?.refreshToken) {
      // setCookie(HEADERS_KEYS.REFRESH_TOKEN, response.refreshToken, {
      //   maxAge: 14 * 24 * 60 * 60 * 1000,
      //   httpOnly: true,
      //   secure: false,
      //   // domain: '.herokuapp.com',
      //   sameSite: 'none'
      // });
    }
    return response;
  }

  async verifyAccount(token: string) {
    const response = await this.post<ISignIn, { token: string }>('auth/verify', { token });
    if (response?.accessToken) {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
    }
    if (response?.refreshToken) {
      // setCookie(HEADERS_KEYS.REFRESH_TOKEN, response.refreshToken, {
      //   maxAge: 14 * 24 * 60 * 60 * 1000,
      //   httpOnly: true,
      //   secure: false,
      //   domain: 'localhost',
      //   sameSite: 'lax'
      // });
    }
    return response;
  }

  async sendRecoverPasswordLink(payload: IRecoveryPayload) {
    return this.post<void, IRecoveryPayload>('auth/recover-password', payload);
  }

  async updatePassword(payload: ISetupPasswordPayload) {
    return this.patch<IUser, ISetupPasswordPayload>('auth/recover-password', payload);
  }

  async refreshAccessToken() {
    const response = await this.get<{ accessToken: string }>('auth/refresh');
    if (response?.accessToken) {
      return Promise.resolve().then(() => {
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
        return response.accessToken;
      });
    }
  }

  async emailCharactersSigninSend(payload: IPasswordlessRequestPayload) {
    return this.post<boolean, IPasswordlessRequestPayload>('auth/email-characters-signin/send', payload);
  }

  async emailCharactersSigninConfirm(payload: IPasswordlessSendCodePayload) {
    const response = await this.post<ISignIn, IPasswordlessSendCodePayload>('auth/email-characters-signin/confirm', payload);
    if (response?.accessToken) {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
    }
    return response;
  }

  async logout() {
    await this.get('auth/logout');
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    deleteCookie(HEADERS_KEYS.REFRESH_TOKEN);
  }
}

export const authService = new AuthService();
