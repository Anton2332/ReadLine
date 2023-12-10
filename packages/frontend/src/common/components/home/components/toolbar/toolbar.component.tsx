import React from 'react';
import { useRouter } from 'next/router';
import ReadLineLogo from '@styles/icons/RlineLogo.png';
import Image from 'next/image';
import * as Styled from './toolbar.styled';
import { ROUTER_KEYS } from '@/common/consts/app-keys.const';
import { ToolbarList } from './toolbar.const';
import { useAuth, useLogout } from '@/common/hooks';

export const ToolbarComponent = () => {
  const { push, pathname, query } = useRouter();
  const { id } = query;
  const { user, isUserLoading } = useAuth();
  const { mutateAsync, isLoading } = useLogout();
  const onClickByLogIn = () => {
    if (user) {
      mutateAsync();
      push(ROUTER_KEYS.SIGNIN);
    } else {
      push(ROUTER_KEYS.SIGNIN);
    }
  };

  return (
    <Styled.ToolbarWrapper>
      <Styled.LogoAndToolbarListWrapper>
        <Image src={ReadLineLogo} alt="ReadLine" width={40} height={40} />
        <Styled.ToolbarList>
          {ToolbarList.map(({ title, path, isLogin }) => {
            if (isLogin && !user) {
              return null;
            }
            return (
              <Styled.ToolbarListItem key={`link-${path}`} href={path} isactive={`${path === pathname && !id}`}>
                {title}
              </Styled.ToolbarListItem>
            );
          })}
        </Styled.ToolbarList>
      </Styled.LogoAndToolbarListWrapper>

      <Styled.LogInButton onClick={onClickByLogIn} disabled={isUserLoading || isLoading}>
        {user ? 'Log out' : 'Log in'}
      </Styled.LogInButton>
    </Styled.ToolbarWrapper>
  );
};
