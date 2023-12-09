import React from 'react';
import { useRouter } from 'next/router';
import TreeDots from '@styles/icons/three.svg';
import * as Styled from './own-book-card.styled';
import { IOwnBook } from '@/common/types/own-books.type';
import { ROUTER_KEYS } from '@/common/consts/app-keys.const';

interface IOwnBookCardProps {
  book: IOwnBook;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>, id: string, title: string) => void;
}

export const OwnBookCardComponent = ({ book, handleClick }: IOwnBookCardProps) => {
  const { push } = useRouter();
  const onClickByCard = () => {
    push(`${ROUTER_KEYS.OWN_BOOKS}?id=${book.id}`);
  };

  const onClickBySettingsButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleClick(e, book.id, book.title);
  };

  const progress = Math.round(+(book.locationIndex ?? 0) * 100);

  return (
    <Styled.OwnBookCardWrapper onClick={onClickByCard}>
      <Styled.SettingsButton onClick={onClickBySettingsButton}>
        <Styled.TreeDots src={TreeDots} alt="Tree Dots" />
      </Styled.SettingsButton>
      {book.imageUrl ? <img src={book.imageUrl} alt={book.title} /> : <div />}
      <span>{book.title}</span>
      <p>{book.author}</p>
      <Styled.ProgressBarWrapper progress={progress}>
        <div />
      </Styled.ProgressBarWrapper>
    </Styled.OwnBookCardWrapper>
  );
};
