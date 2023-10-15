import { useMutation, useQueryClient } from 'react-query';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { authService, userService } from '@services';
import { QUERY_KEYS, ROUTER_KEYS, STORAGE_KEYS } from '@/common/consts/app-keys.const';
import { useUser } from '@/common/hooks/use-user';
import { IUserPayload } from '../types/user.type';
import { IPasswordlessRequestPayload, IPasswordlessSendCodePayload, IRecoveryPassword, IRegisterUserPayload } from '../types/auth.type';

export const useAuth = () => {
  const user = useUser();
  const { push, pathname } = useRouter();

  const {
    data,
    isLoading: isUserLoading,
    mutateAsync: getMe
  } = useMutation({
    mutationKey: [QUERY_KEYS.USER],
    mutationFn: () => userService.me(),
    onSuccess: async (me) => {
      if (!me) {
        await push(ROUTER_KEYS.AUTH);
      }
      if (me) {
        if (me.setupStep === 5 && pathname === ROUTER_KEYS.ONBOARDING) {
          await push(ROUTER_KEYS.PROFILE);
        }
      }
    },
    onError: () => push(ROUTER_KEYS.AUTH)
  });

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (!token) {
      push(ROUTER_KEYS.AUTH);
    }

    if (!user && token) getMe();

    if (user) {
      if (!user?.setupStep || user?.setupStep === null) {
        push(ROUTER_KEYS.PULL);
      } else if (user?.setupStep === 0) {
        push(ROUTER_KEYS.ROOT);
      } else if (user?.setupStep > 0 && user?.setupStep <= 4) {
        push(ROUTER_KEYS.ONBOARDING);
      }
    }
  }, [user]);

  return { isUserLoading, user: user ?? data };
};

export const useVerifyAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token: string) => authService.verifyAccount(token),
    onSuccess: (data) => {
      if (!data) return;
      queryClient.setQueryData([QUERY_KEYS.USER], data);
    }
  });
};

export const useLoginAccount = (onError?: (err: unknown) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUserPayload) => authService.signIn(data),
    onSuccess: (data) => {
      if (!data) return;
      queryClient.setQueryData([QUERY_KEYS.USER], data);
    },
    onError
  });
};

export const useRegisterAccount = (onSuccess?: () => void, onError?: (err: unknown) => void) =>
  useMutation({
    mutationFn: (data: IRegisterUserPayload) => authService.signUp(data),
    onSuccess,
    onError
  });

export const useSendRestorePasswordLink = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IRecoveryPassword) =>
      authService.sendRecoverPasswordLink({
        email: data.email,
        redirectUri: window.location.origin + ROUTER_KEYS.RECOVER_PASSWORD
      }),
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess();
      }
      if (!data) return;
      queryClient.setQueryData([QUERY_KEYS.USER], data);
    }
  });
};

export const useEmailCharactersLoginSend = () =>
  useMutation({
    mutationFn: (data: IPasswordlessRequestPayload) => authService.emailCharactersSigninSend(data)
  });

export const useEmailCharactersLoginConfirm = (onError?: (err: unknown) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IPasswordlessSendCodePayload) => authService.emailCharactersSigninConfirm(data),
    onSuccess: (data) => {
      if (!data) return;
      queryClient.setQueryData([QUERY_KEYS.USER], data);
    },
    onError
  });
};
