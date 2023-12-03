import { useMutation, useQuery, useQueryClient } from 'react-query';

const KEYS = {
  SCROLL_X: 'SCROLL_X'
};

export const useSetScrollX = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (scrollX: number) => Promise.resolve(scrollX),
    onSuccess: (data) => {
      queryClient.setQueryData([KEYS.SCROLL_X], data);
      queryClient.invalidateQueries([KEYS.SCROLL_X]);
    }
  });
};

export const useScrollX = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: [KEYS.SCROLL_X],
    queryFn: () => queryClient.getQueryData<number>([KEYS.SCROLL_X])
  });
};
