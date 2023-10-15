import { AuthType } from '@/common/types/auth.type';

export const EMAIL_MATCH = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export const PASSWORD_MATCH = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
export const PASSWORD_ERROR_TEXT =
  'Password must be a minimum of 8 characters with one of each: uppercase letter; lowercase letter; number; symbol';
export const EMAIL_ERROR_TEXT = 'Invalid email address';
export const RESET_PASSWORD_TEXT = 'Please check your mail to restore your password';
export const CONFIRM_REGISTRATION_TEXT = 'Confirm registration via link emailed to you';

export const EMAIL_NOT_REGISTERED_TEXT = 'This email is not registered with an account. Waitlist coming soon.';

export const BACK_TITLE = {
  [AuthType.LOGIN]: 'Log in',
  [AuthType.REGISTRATION]: 'Join',
  [AuthType.RESET_PASSWORD]: 'Password reset'
};

export const SUBMIT_TEXT = {
  [AuthType.LOGIN]: 'Enter',
  [AuthType.REGISTRATION]: 'Start',
  [AuthType.RESET_PASSWORD]: 'Send link to reset'
};

export const getLoginError = (email: string, password: string, emailError: boolean) => {
  if (!email && !password) return 'Email and password entry cannot be empty';
  if (!email) return 'Email entry cannot be empty';
  if (emailError && !password) return `${EMAIL_ERROR_TEXT} / Password entry cannot be empty`;
  if (emailError) return EMAIL_ERROR_TEXT;
  if (!password) return 'Password entry cannot be empty';
};
