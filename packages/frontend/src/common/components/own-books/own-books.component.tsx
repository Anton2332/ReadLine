import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { MenuItem, SelectChangeEvent } from '@mui/material';
import * as Styled from './own-books.styled';
import { ToolbarComponent } from '../home/components/toolbar';
import { ReadBookComponent } from '../read-book';
import { AllOwnBooksComponent } from './components/all-own-books';
import { AddOwnBookModalComponent } from '../all-modals';
import { OrderByOwnBookEnum } from '@/common/types/own-books.type';

export const OwnBooksComponent = () => {
  const { query } = useRouter();
  const { id } = query;

  const [open, setOpen] = useState(false);
  const [orderBy, setOrderBy] = useState(OrderByOwnBookEnum.LAST_OPEN);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleChangeOrderBy = (event: SelectChangeEvent<unknown>) => {
    setOrderBy(event.target.value as OrderByOwnBookEnum);
  };
  return (
    <Styled.OwnBooksWrapper>
      <ToolbarComponent />

      {!id && (
        <>
          <Styled.PageTitleWraper>
            <h3>Its your books</h3>
            <span>
              You can add your own books on this page.
              <br />
              To read further and track progress.
              <br />
              Only you can see them.
            </span>

            <Styled.CustomizeSelectFromMUI value={orderBy} onChange={(e) => handleChangeOrderBy(e)}>
              <MenuItem value={OrderByOwnBookEnum.LAST_OPEN}>Last Open</MenuItem>
              <MenuItem value={OrderByOwnBookEnum.FIRST_OPEN}>First Open</MenuItem>
              <MenuItem value={OrderByOwnBookEnum.LAST_CREATED}>Last Created</MenuItem>
              <MenuItem value={OrderByOwnBookEnum.FIRST_CREATED}>First Created</MenuItem>
            </Styled.CustomizeSelectFromMUI>
            <button type="button" onClick={openModal}>
              <p>Add new</p>
            </button>
          </Styled.PageTitleWraper>
          <AddOwnBookModalComponent open={open} orderBy={orderBy} closeHandler={closeModal} />
          <AllOwnBooksComponent orderBy={orderBy} />
        </>
      )}
      {id && <ReadBookComponent id={id?.toString()} />}
    </Styled.OwnBooksWrapper>
  );
};
