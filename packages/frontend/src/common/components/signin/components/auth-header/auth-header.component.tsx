import React from 'react';
import { useRouter } from 'next/router';
import LeftArrow from '@styles/icons/left-arrow-on-auth-header.png';
import Question from '@styles/icons/question-on-auth-header.png';
import * as Styled from './auth-header.styled';

interface IAuthHeaderProps {
  backCallback?: () => void;
}

export const AuthHeaderComponent = ({ backCallback }: IAuthHeaderProps) => {
  const { back } = useRouter();
  const onClickBack = () => {
    if (backCallback) {
      backCallback();
    }
    if (!backCallback) {
      back();
    }
  };
  return (
    <Styled.HeaderWrapper>
      <Styled.ImageWrapper onClick={onClickBack} src={LeftArrow} alt="Left Arrow" />
      <Styled.ImageWrapper src={Question} alt="Question" />
    </Styled.HeaderWrapper>
  );
};
