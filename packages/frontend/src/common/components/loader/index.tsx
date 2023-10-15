import React from 'react';
import * as Styled from './loader.styled';
import { ILoaderPayload } from '@/common/types/loader.type';

export const Loader = ({ className, ...props }: ILoaderPayload) => (
  <Styled.LoaderContainer className={className}>
    <Styled.Loader {...props} />
  </Styled.LoaderContainer>
);
