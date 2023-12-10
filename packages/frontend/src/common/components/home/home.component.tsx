import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Styled from './home.styled';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ROUTER_KEYS } from '@/common/consts/app-keys.const';

export const HomeComponent = () => {
  const { push } = useRouter();

  useEffect(() => {
    push(ROUTER_KEYS.OWN_BOOKS);
  }, []);

  return (
    <Styled.HomeWrapper>
      <ToolbarComponent />
    </Styled.HomeWrapper>
  );
};
