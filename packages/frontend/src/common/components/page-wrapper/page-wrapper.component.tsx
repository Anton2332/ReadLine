import React from 'react';
import * as Styled from './page-wrapper.styled';
import ErrorBoundary from '../error-boundary/error-boundary.component';

interface PageWrapperProps {
  children?: React.ReactNode;
}

export const PageWrapperComponent = ({ children }: PageWrapperProps) => (
  <ErrorBoundary>
    <Styled.Wrapper>
      <Styled.ChildWrapper>{children}</Styled.ChildWrapper>
    </Styled.Wrapper>
  </ErrorBoundary>
);
