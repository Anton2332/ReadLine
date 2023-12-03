import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../consts/app-keys.const';
import { ownBooksService } from '../services';
import { IOwnBook, IUpdateOwnBook, IUploadOwnBook, OrderByOwnBookEnum } from '../types/own-books.type';

export const useOwnBookById = (id?: string) => useQuery([QUERY_KEYS.OWN_BOOK, id], () => (id ? ownBooksService.getById(id) : null));

export const useUpdateLocationIndexInOwnBook = (id: string) =>
  useMutation([QUERY_KEYS.UPDATE_LOCATION_OWN_BOOK, id], (locationIndex: string) =>
    ownBooksService.updateLocationIndexById({ id, locationIndex })
  );

export const useAllOwnBooks = ({ orderBy }: { orderBy: OrderByOwnBookEnum }) => {
  const queryClient = useQueryClient();
  const { data: books } = useQuery([QUERY_KEYS.PAGET_OWN_BOOKS, orderBy], () =>
    queryClient.getQueryData<IOwnBook[]>([QUERY_KEYS.PAGET_OWN_BOOKS, orderBy])
  );
  return {
    allBooks: books,
    setAllBooks: (data: IOwnBook[]) => {
      queryClient.setQueryData([QUERY_KEYS.PAGET_OWN_BOOKS, orderBy], data);
      queryClient.invalidateQueries([QUERY_KEYS.PAGET_OWN_BOOKS, orderBy]);
    },
    setNewBooks: (data: IOwnBook[], isBefore?: boolean) => {
      const oldBooks = queryClient.getQueryData<IOwnBook[]>([QUERY_KEYS.PAGET_OWN_BOOKS, orderBy]);
      const filterOldPosts = (oldBooks ?? []).filter(({ id }) => !data.find(({ id: newId }) => id === newId));
      const newBooks = [...(isBefore ? data : []), ...(filterOldPosts ?? []), ...(!isBefore ? data : [])];
      queryClient.setQueryData([QUERY_KEYS.PAGET_OWN_BOOKS, orderBy], newBooks);
      queryClient.invalidateQueries([QUERY_KEYS.PAGET_OWN_BOOKS, orderBy]);
    },
    updateBook: (data: IOwnBook) => {
      const booksData = queryClient.getQueryData<IOwnBook[]>([QUERY_KEYS.PAGET_OWN_BOOKS, orderBy]);
      const updatedBooks = booksData?.map((book) => {
        if (book.id === data.id) {
          return data;
        }

        return book;
      });

      queryClient.setQueryData([QUERY_KEYS.PAGET_OWN_BOOKS, orderBy], updatedBooks);
      queryClient.invalidateQueries([QUERY_KEYS.PAGET_OWN_BOOKS, orderBy]);
    },
    deleteBook: (data: IOwnBook) => {
      const booksData = queryClient.getQueryData<IOwnBook[]>([QUERY_KEYS.PAGET_OWN_BOOKS, orderBy]);
      const updatedBooks = booksData
        ?.map((book) => {
          if (book.id === data.id) {
            return null;
          }

          return book;
        })
        .filter((it) => it);

      queryClient.setQueryData([QUERY_KEYS.PAGET_OWN_BOOKS, orderBy], updatedBooks);
      queryClient.invalidateQueries([QUERY_KEYS.PAGET_OWN_BOOKS, orderBy]);
    }
  };
};

export const useFetchOwnBooks = ({ orderBy }: { orderBy: OrderByOwnBookEnum }) => {
  const { setAllBooks, setNewBooks } = useAllOwnBooks({ orderBy });
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch } = useInfiniteQuery(
    [QUERY_KEYS.FETCH_PAGET_OWN_BOOKS, orderBy],
    ({ pageParam = 0 }) => ownBooksService.getPagetOwnBooks(pageParam, orderBy),
    {
      getNextPageParam(lastPage) {
        if (!lastPage) return;
        return lastPage.hasNextPage;
      },
      onSuccess: (data) => {
        if (!data) return;
        const pageNumber = data.pages.length;
        const lastPage = data.pages[pageNumber - 1];
        if (!lastPage) return;
        const { data: booksData } = lastPage;
        if (pageNumber === 1) {
          setAllBooks(booksData);
        }
        setNewBooks(booksData);
      }
    }
  );

  return {
    hasNextPageList: hasNextPage,
    isFetchingNextPageList: isFetchingNextPage,
    isListLoading: isLoading,
    fetchNextPageList: fetchNextPage,
    refetchList: refetch
  };
};

export const useUploadOwnBook = ({ orderBy, onSuccess }: { orderBy: OrderByOwnBookEnum; onSuccess: () => void }) => {
  const { setNewBooks } = useAllOwnBooks({ orderBy });
  return useMutation([QUERY_KEYS.UPLOAD_OWN_BOOK], (data: IUploadOwnBook) => ownBooksService.uploadOwnBook(data), {
    onSuccess: (data) => {
      onSuccess();
      if (!data) return;
      setNewBooks([data], true);
    }
  });
};

export const useDeleteOwnBook = ({ orderBy }: { orderBy: OrderByOwnBookEnum }) => {
  const { deleteBook } = useAllOwnBooks({ orderBy });
  return useMutation((id: string) => ownBooksService.deleteOne(id), {
    onSuccess: (data) => {
      if (!data) return;
      deleteBook(data);
    }
  });
};

export const useUpdateOwnBook = ({ orderBy, onSuccess }: { orderBy: OrderByOwnBookEnum; onSuccess: () => void }) => {
  const { updateBook } = useAllOwnBooks({ orderBy });
  return useMutation((data: IUpdateOwnBook) => ownBooksService.updateOwnBook(data), {
    onSuccess: (data) => {
      onSuccess();
      if (!data) return;
      updateBook(data);
    }
  });
};
