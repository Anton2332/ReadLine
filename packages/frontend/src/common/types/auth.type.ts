import { IUser } from '@/common/types/user.type';

export enum Role {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN'
}

export enum AuthType {
  REGISTRATION = 'REGISTRATION',
  LOGIN = 'LOGIN',
  RESET_PASSWORD = 'RESET_PASSWORD'
}

export interface IRegisterUserPayload {
  email: string;
  password: string;
  redirectUri: string;
}

export interface IGetMe {
  id: string;
  email: string;
  accessToken: string;
  setupStep: number | null;
}

export interface ISignIn extends IUser {
  accessToken: string;
  refreshToken: string;
}

export interface IRecoveryPayload {
  email: string;
  redirectUri: string;
}

export interface IRecoveryPassword {
  email: string;
}

export interface ISetupPassword {
  password: string;
  repeatPassword: string;
}

export interface ISetupPasswordPayload {
  password: string;
  token: string;
}

export interface IPasswordlessRequestPayload {
  email: string;
}

export interface IPasswordlessSendCodePayload extends IPasswordlessRequestPayload {
  code: string;
}
