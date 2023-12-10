import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as Styled from '../signin/signin.styled';
import { AuthHeaderComponent } from '../signin/components/auth-header/auth-header.component';
import { ROUTER_KEYS } from '@/common/consts/app-keys.const';
import { EMAIL_ERROR_TEXT, PASSWORD_ERROR_TEXT, PASSWORD_MATCH } from '../signin';
import { IUserPayload } from '@/common/types/user.type';
import { useRegisterAccount, useVerifyAccount } from '@/common/hooks';
import { Loader } from '../loader';

const schemaSignUp = Joi.object({
  email: Joi.string().email({ tlds: false }).message(EMAIL_ERROR_TEXT).required(),
  password: Joi.string().regex(PASSWORD_MATCH).message(PASSWORD_ERROR_TEXT).required(),
  passwordRepeat: Joi.any()
    .valid(Joi.ref('password'))
    .label('Repeat Password')
    .options({ messages: { 'any.only': '{{#label}} does not match' } })
});

export const SignUpComponent = () => {
  const [isEmailChoice, setIsEmailChoice] = useState(false);
  const [isClickOnece, setIsClickOnece] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const { query, push } = useRouter();

  const { mutateAsync: verifyAccount } = useVerifyAccount();
  const { mutateAsync: registerAccount, isLoading: registerIsLoading } = useRegisterAccount(() => toast.success('Confirm email are send'));

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUserPayload & { passwordRepeat: string }>({
    resolver: joiResolver(schemaSignUp)
  });

  const onClickByEmailChoice = () => {
    setIsEmailChoice(true);
  };

  const onClickToLogIn = () => {
    push(ROUTER_KEYS.SIGNIN);
  };

  const onSubmit = async (data: IUserPayload) => {
    const dateNow = new Date();
    await registerAccount({ ...data, redirectUri: window.location.origin + ROUTER_KEYS.SIGNUP, birthday: dateNow });
  };

  const verifyUser = async () => {
    try {
      const user = await verifyAccount(query.token as string);
      if (user) {
        push(ROUTER_KEYS.ROOT);
      } else setIsTimeout(true);
    } catch {
      setIsTimeout(true);
    }
  };

  useEffect(() => {
    if (query.token) {
      verifyUser();
    }
  }, [query]);

  return (
    <>
      <AuthHeaderComponent backCallback={isEmailChoice ? () => setIsEmailChoice(false) : undefined} />
      {query.token && !isTimeout && <Loader />}
      {!isEmailChoice && (!query.token || isTimeout) && (
        <Styled.AuthChoiceWrapper>
          <p>Sign up</p>
          {/* <Styled.ChocheButton>
            <p>Sign up with Google</p>
          </Styled.ChocheButton> */}
          <Styled.ChocheButton onClick={onClickByEmailChoice}>
            <p>Sign up with email</p>
          </Styled.ChocheButton>

          <span>Already have an account?</span>
          <Styled.RedirectButton onClick={onClickToLogIn}>
            <p>Log in</p>
          </Styled.RedirectButton>
        </Styled.AuthChoiceWrapper>
      )}
      {isEmailChoice && (!query.token || isTimeout) && (
        <Styled.AuthEmailChoiceForm
          onSubmit={() => {
            setIsClickOnece(true);
            handleSubmit(onSubmit);
          }}
        >
          <p>Sign up with email</p>
          <input type="email" placeholder="Email" {...register('email')} />
          <input type="password" placeholder="Password" {...register('password')} />
          <input type="password" placeholder="Repeat Password" {...register('passwordRepeat')} />
          <button type="submit" disabled={registerIsLoading}>
            {registerIsLoading ? <Loader width={12} height={12} borderSize={2} /> : <p>Sign up</p>}
          </button>
          {isClickOnece && <span>{errors.email?.message ?? errors.password?.message ?? errors.passwordRepeat?.message ?? ''}</span>}
        </Styled.AuthEmailChoiceForm>
      )}
    </>
  );
};
