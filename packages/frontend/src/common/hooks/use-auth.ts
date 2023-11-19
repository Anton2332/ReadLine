import { useMutation, useQueryClient } from 'react-query';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { QUERY_KEYS, ROUTER_KEYS, STORAGE_KEYS } from '@/common/consts/app-keys.const';
import { useUser } from '@/common/hooks/use-user';
import { IRegisterUserPayload } from '../types/auth.type';
import { IUserPayload } from '../types/user.type';
import { authService, userService } from '../services';

export const useAuth = () => {
  const user = useUser();

  const {
    data,
    isLoading: isUserLoading,
    mutateAsync: getMe
  } = useMutation({
    mutationKey: [QUERY_KEYS.USER],
    mutationFn: () => userService.me()
  });

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (!token) {
      authService.refreshAccessToken();
    }

    if (!user && token) getMe();
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
  const { push } = useRouter();

  return useMutation({
    mutationFn: (data: IUserPayload) => authService.signIn(data),
    onSuccess: (data) => {
      if (!data) return;
      queryClient.setQueryData([QUERY_KEYS.USER], data);
      push(ROUTER_KEYS.ROOT);
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
