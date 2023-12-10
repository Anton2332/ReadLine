import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import * as Styled from './signin.styled';
import { AuthHeaderComponent } from './components/auth-header';
import { ROUTER_KEYS } from '@/common/consts/app-keys.const';
import { EMAIL_ERROR_TEXT } from './signin.const';
import { IUserPayload } from '@/common/types/user.type';
import { useLoginAccount } from '@/common/hooks';
import { Loader } from '../loader';

const schemaSignIn = Joi.object({
  email: Joi.string().email({ tlds: false }).message(EMAIL_ERROR_TEXT).required(),
  password: Joi.string().required()
});

export const SignInComponent = () => {
  const [isEmailChoice, setIsEmailChoice] = useState(false);
  const { push } = useRouter();

  const { mutateAsync: loginAccount, isLoading } = useLoginAccount();

  const { register, handleSubmit } = useForm<IUserPayload>({
    resolver: joiResolver(schemaSignIn)
  });

  const onSubmit = async (data: IUserPayload) => {
    await loginAccount(data);
  };

  const onClickByEmailChoice = () => {
    setIsEmailChoice(true);
  };

  const onClickToSignUp = () => {
    push(ROUTER_KEYS.SIGNUP);
  };

  return (
    <>
      <AuthHeaderComponent backCallback={isEmailChoice ? () => setIsEmailChoice(false) : undefined} />
      {!isEmailChoice && (
        <Styled.AuthChoiceWrapper>
          <p>Log in</p>
          {/* <Styled.ChocheButton>
            <p>Log in with Google</p>
          </Styled.ChocheButton> */}
          <Styled.ChocheButton onClick={onClickByEmailChoice}>
            <p>Log in with email</p>
          </Styled.ChocheButton>

          <span>New to ReadLine?</span>
          <Styled.RedirectButton onClick={onClickToSignUp}>
            <p>Sign up</p>
          </Styled.RedirectButton>
        </Styled.AuthChoiceWrapper>
      )}
      {isEmailChoice && (
        <Styled.AuthEmailChoiceForm onSubmit={handleSubmit(onSubmit)}>
          <p>Log in with email</p>
          <input type="email" placeholder="Email" {...register('email')} />
          <input type="password" placeholder="Password" {...register('password')} />
          <button type="submit" disabled={isLoading}>
            {isLoading ? <Loader width={18} height={18} borderSize={2} /> : <p>Log in</p>}
          </button>
        </Styled.AuthEmailChoiceForm>
      )}
    </>
  );
};
