import { useQueryClient } from 'react-query';
import { IUser } from '@/common/types/user.type';
import { QUERY_KEYS } from '@/common/consts/app-keys.const';

export const useUser = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<IUser>([QUERY_KEYS.USER]);

  return user;
};
