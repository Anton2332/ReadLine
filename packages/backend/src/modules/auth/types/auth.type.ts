export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserFromTocken {
  id: string;
  email: string;
  role: string;
}

export interface IUser extends IUserFromTocken {
  nickname: string;
  avater?: string;
  createdAt: Date;
}

export interface IUserRegisterForToken extends IUserLogin {
  birthday: Date;
}

export interface IUserRegister extends IUserRegisterForToken {
  redirectUri: string;
}

export interface IUserResponse extends IUser {
  accessToken: string;
  refreshToken: string;
}

export enum ErrorMessages {
  QUESTION_ALREADY_EXISTS = 'Question with this text already exists',
  REGION_ALREADY_EXISTS = 'Region with this name already exists',
  SECTOR_ALREADY_EXISTS = 'Sector with this name already exists',
  SUB_SECTOR_ALREADY_EXISTS = 'Sub sector with this name already exists',
  COMPANY_ALREADY_EXISTS = 'Company with this name already exists',
  WRONG_USER_CREDENTIALS = 'User with this credentials does not exists',
  NEW_WRONG_USER_CREDENTIALS = 'User with this email address does not exist',
  USER_ALREADY_EXISTS = 'Email address is already in use',
  WRONG_EMAIL_OR_PASSWORD = 'Wrong email or password',
  NOT_ENOUGH_PERMISSIONS = "You don't have permissions to login here",
  LINKEDIN_WAS_NOT_FOUND = "We couldn't find this linkedin account",
  NOT_AUTHORIZED = 'You are not authorized for this operation',
  EMPLOYER_NOT_FOUND = 'Employer with this id was not found',
  EDUCATION_NOT_FOUND = 'Education with this id was not found'
}
