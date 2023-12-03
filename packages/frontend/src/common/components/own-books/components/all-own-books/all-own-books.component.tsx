import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button } from '@mui/material';
import * as Styled from './all-own-books.styled';
import { useAllOwnBooks, useDeleteOwnBook, useFetchOwnBooks } from '@/common/hooks/use-own-book';
import { OwnBookCardComponent } from '../own-book-card/own-book-card.component';
import { OrderByOwnBookEnum } from '@/common/types/own-books.type';

interface AllOwnBooksProps {
  orderBy: OrderByOwnBookEnum;
  handleOpenUpdateModal: (id: string) => void;
}

export const AllOwnBooksComponent = ({ orderBy, handleOpenUpdateModal }: AllOwnBooksProps) => {
  const { ref: loadingInViewRef, inView: isLoadingInView } = useInView({
    threshold: 0.1
  });
  const { allBooks } = useAllOwnBooks({ orderBy });
  const { fetchNextPageList, hasNextPageList, isFetchingNextPageList, isListLoading } = useFetchOwnBooks({ orderBy });
  const { mutateAsync: deleteBook } = useDeleteOwnBook({ orderBy });

  useEffect(() => {
    if (!isLoadingInView) return;
    if (hasNextPageList) {
      fetchNextPageList();
    }
  }, [isLoadingInView]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [inPopoverObject, setInPopoverObject] = useState<{ id: string; title: string } | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: string, title: string) => {
    setAnchorEl(event.currentTarget);
    setInPopoverObject({ id, title });
  };

  const handleClose = () => {
    setAnchorEl(null);
    setInPopoverObject(null);
  };

  const open = Boolean(anchorEl);

  const onClickByDeleteButton = async () => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    const isDeleteConfirm = confirm(`Delete book with name '${inPopoverObject?.title}'?`);
    if (isDeleteConfirm && inPopoverObject) {
      deleteBook(inPopoverObject.id);
    }
    handleClose();
  };

  const onClickByUpdateButton = async () => {
    if (!inPopoverObject) return;
    handleOpenUpdateModal(inPopoverObject.id);
    handleClose();
  };

  return (
    <Styled.AllOwnBooksWrapper>
      {allBooks?.map((book) => <OwnBookCardComponent handleClick={handleClick} key={`card-id-${book.id}`} book={book} />)}
      <Styled.PopoverCustome
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Button onClick={onClickByUpdateButton}>Update</Button>
        <Button color="error" onClick={onClickByDeleteButton}>
          delete
        </Button>
      </Styled.PopoverCustome>
      <div ref={loadingInViewRef} style={{ display: isFetchingNextPageList || isListLoading ? 'none' : 'block' }} />
    </Styled.AllOwnBooksWrapper>
  );
};
