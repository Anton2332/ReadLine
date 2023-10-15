import styled, { keyframes } from 'styled-components';
import { COLORS, FONTS, SPACES } from '@theme';
import Image from 'next/image';
import { FAMILIES, SIZES, WEIGHTS } from '@/theme/fonts.const';
import { CodeInputComponent } from './components/code-input';

export const AuthWrapper = styled.div`
  display: flex;
  background: ${COLORS.onboardBackgroundColor};
  font-family: ${FAMILIES.robotoFlex};
  width: 100vw;
  height: 100vh;
  align-items: center;
  flex-direction: column;
`;

export const AuthLogoWrapper = styled.div`
  margin-top: 150px;
  flex-direction: column;
  display: flex;
  font-family: ${FAMILIES.robotoFlex};
  font-weight: ${WEIGHTS.medium};
  align-items: center;
  gap: ${SPACES.s};
  & > div {
    text-shadow: 2px 2px 4px #e8e8e8;
  }
`;

export const AuthLogo = styled.div`
  font-size: 50px;
  line-height: 50px;
  color: #cdcdcd;
  letter-spacing: 2.5px;
  filter: blur(1.5px);
`;

export const AuthVersion = styled.div`
  font-size: 30px;
  line-height: 30px;
  color: #dedede;
  letter-spacing: 1.5px;
  filter: blur(1px);
`;

export const AuthForm = styled.form`
  margin-top: 80px;
  font-size: 16px;
  line-height: 16px;
  width: 350px;
  height: 400px;
`;

export const InputWrapper = styled.div`
  background: linear-gradient(102.25deg, rgba(247, 247, 247, 0.06) 0%, rgba(238, 238, 238, 0.12) 100%);
  height: 45px;
  width: 350px;
  border-radius: 5px;
`;

export const AuthInput = styled.input`
  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    transition:
      background-color 600000s 0s,
      color 600000s 0s;
  }
  background-color: ${COLORS.authInputBackground};
  height: 100%;
  width: 100%;
  border: none;
  border-radius: 5px;
  color: ${COLORS.authInputTextColor};
  text-align: center;
  letter-spacing: ${SPACES.mediumLetterSpacing};
  font-family: ${FAMILIES.robotoFlex};
  outline: none;
  font-weight: ${FONTS.WEIGHTS.light};

  ::placeholder {
    color: ${COLORS.authInputTextColor};
  }
`;

export const AuthButtonsWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AuthButton = styled.button`
  font-size: 16px;
  line-height: 16px;
  width: 100%;
  height: 46px;
  border: none;
  border-radius: 5px;
  background: ${COLORS.onboardBackgroundColor};
  color: ${COLORS.black};
  letter-spacing: ${SPACES.mediumLetterSpacing};
  font-family: ${FAMILIES.robotoFlex};
  font-weight: ${FONTS.WEIGHTS.medium};
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(1.1px);
    box-shadow: 0px 4px 4px -5px #b9b9b9;
  }
`;

export const AuthInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

export const AuthErrorMessage = styled.div<{ isPasswordError?: boolean }>`
  color: ${COLORS.authTypeColor};
  font-family: ${FONTS.FAMILIES.robotoFlex};
  font-weight: ${({ isPasswordError }) => (isPasswordError ? FONTS.WEIGHTS.light : FONTS.WEIGHTS.normal)};
  line-height: 22px;
  text-align: center;
  font-size: 14px;
`;

export const AuthInfoMessage = styled.div`
  color: #a4a4a4;
  letter-spacing: ${SPACES.mediumLetterSpacing};
  line-height: 18px;
  text-align: center;
`;

export const ForgotPassword = styled.div`
  margin: ${SPACES.xxxs} auto;
  color: ${COLORS.authTypeColor};
  font-family: ${FAMILIES.robotoFlex};
  font-weight: ${WEIGHTS.normal};
  font-size: ${SIZES.m};
  cursor: pointer;
`;

export const AuthInfoWrapper = styled.div`
  position: relative;
  margin-top: 70px;
`;

export const AuthInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  position: absolute;
  left: -50px;
  width: 450px;
`;

const appearAnimation = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`;

export const AuthTypeButtonWrapper = styled.div`
  display: flex;
  animation: ${appearAnimation} 0.5s ease;
  width: 372px;
  transform: translateX(-11px);

  & > button:first-child {
    margin-right: 21px;
  }
`;

export const AuthFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${appearAnimation} 0.5s ease;
`;

export const AuthTypeButton = styled.button`
  font-family: ${FONTS.FAMILIES.robotoFlex};
  font-size: ${FONTS.SIZES.l};
  font-weight: ${FONTS.WEIGHTS.medium};
  width: 100%;
  height: 56px;
  letter-spacing: ${SPACES.mediumLetterSpacing};
  color: ${COLORS.authTypeColor};
  border-radius: 30px;
  cursor: pointer;
  background: ${COLORS.onboardBackgroundColor};
  border: none;
  box-shadow: 1px 1px 8px -3px #eeeeee;
`;

export const AuthTypeBackWrapper = styled.div`
  height: 46px;
  display: flex;
  position: relative;
  margin-bottom: 20px;
`;

export const AuthBackArrowImageWrapper = styled.div`
  height: 100%;
  width: 36px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const AuthBackTitle = styled.div`
  font-weight: ${FONTS.WEIGHTS.medium};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: ${COLORS.authTypeColor};
  letter-spacing: ${SPACES.mediumLetterSpacing};
  font-size: 16px;
`;

export const AuthInfoPasswordFreeLogin = styled.div`
  font-size: 14px;
  color: #c2c2c2;
  text-align: center;
`;

export const InputBlankSpace = styled.div`
  height: 45px;
  margin-bottom: 10px;
`;

export const PasswordlessContainer = styled.div`
  margin-top: 258px;
  height: 222px;
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const EmailInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const EmailInput = styled.input`
  width: 100%;
  border: none;
  padding: 18px 80px 18px 20px;
  border-radius: 20px;
  background: linear-gradient(90deg, #f3f3f3 71.86%, #e8e8e8 85.23%);
  font-family: ${FONTS.FAMILIES.ibmPlexSansHebrew};
  font-size: ${FONTS.SIZES.m};
  line-height: ${FONTS.SIZES.m};
  font-weight: ${FONTS.WEIGHTS.light};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #868686;
  }

  &:disabled {
    background: linear-gradient(90deg, #e8e8e8 71.86%, #e8e8e8 85.23%);
  }
`;

export const EmailInputButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  border: none;
  background: transparent;
  border-radius: 0px 20px 20px 0px;
  box-shadow: 4px 4px 8px 0px #f2f2f2;
  width: 52px;
  height: 100%;
  cursor: pointer;
`;

export const EmailInputIcon = styled(Image)<{ isShadow: boolean }>`
  ${({ isShadow }) => (isShadow ? 'transform: translate(4px, 4px)' : '')}
`;

export const EnterCodeTitle = styled.div`
  margin-top: 50px;
  color: #808080;
  font-weight: ${FONTS.WEIGHTS.light};
  font-size: ${FONTS.SIZES.m};
`;

export const EnterCodeComponent = styled(CodeInputComponent)`
  margin-top: 20px;
`;

export const PasswordlessErrorText = styled.div`
  color: #808080;
  line-height: 22px;
  position: absolute;
  top: -62px;
  white-space: nowrap;
  font-size: ${FONTS.SIZES.m};
  font-weight: ${FONTS.WEIGHTS.light};
`;

export const ChangeLoginButton = styled.button`
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
`;
