import React from 'react';
import { useRouter } from 'next/router';
import ReadLineLogo from '@styles/icons/RlineLogo.png';
import LeftArrow from '@styles/icons/left-arrow-on-auth-header.png';
import Question from '@styles/icons/question-on-auth-header.png';
import Image from 'next/image';
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
    // if (!backCallback) {
    //   back();
    // }
  };
  return (
    <Styled.HeaderWrapper>
      {backCallback ? (
        <Styled.ImageWrapper onClick={onClickBack} src={LeftArrow} alt="Left Arrow" />
      ) : (
        <Image src={ReadLineLogo} alt="ReadLine" width={40} height={40} />
      )}
      {/* <Styled.ImageWrapper src={Question} alt="Question" /> */}
    </Styled.HeaderWrapper>
  );
};
