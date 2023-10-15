import React from 'react';

import { authService, userService } from '@services';
import { useMutation, useQueryClient } from 'react-query';
import { Loader } from '@components/loader';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import * as Styled from './home.styled';
import { QUERY_KEYS, ROUTER_KEYS } from '@/common/consts/app-keys.const';
import { SPACES } from '@/theme';
import { useAuth, useDeleteProfile, useUpdateSetupStep } from '@/common/hooks';

export const HomeComponent = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { user, isUserLoading } = useAuth();
  const { mutateAsync: updateSetupStep } = useUpdateSetupStep();
  const {
    data: invitationLink,
    isLoading: isInvitationLinkLoading,
    mutateAsync: getInvitationLink
  } = useMutation({
    mutationFn: (url: string) => userService.getInvitationLink(url)
  });

  const { mutateAsync: deleteProfile } = useDeleteProfile();

  const onGenerateClick = async () => {
    await getInvitationLink(window.location.origin + ROUTER_KEYS.AUTH);
  };

  const onGeneratedLinkClick = () => {
    if (invitationLink) navigator.clipboard.writeText(invitationLink);
    toast('Invitation link copied to the clipboard');
  };

  const onLogoutClick = async () => {
    await authService.logout();
    queryClient.removeQueries([QUERY_KEYS.USER]);
    await push(ROUTER_KEYS.AUTH);
  };

  const onDeleteClick = async () => {
    if (user?.id) {
      await deleteProfile(user.id);
      queryClient.removeQueries([QUERY_KEYS.PROFILE]);
      await push(ROUTER_KEYS.AUTH);
    }
  };

  const onOnboardingClick = () => {
    updateSetupStep(1);
  };

  return (
    <Styled.HomeWrapper>
      {isUserLoading ? (
        <Loader />
      ) : (
        <>
          <Styled.ActionWrapper>
            <Styled.GenerateLinkButton onClick={onDeleteClick}>Delete Profile</Styled.GenerateLinkButton>
            <Styled.GenerateLinkButton onClick={onOnboardingClick}>Onboarding</Styled.GenerateLinkButton>
            <Styled.GenerateLinkButton onClick={onLogoutClick}>Logout</Styled.GenerateLinkButton>
          </Styled.ActionWrapper>
          <Styled.GenerateLinkButton onClick={onGenerateClick}>
            {isInvitationLinkLoading ? <Loader width={SPACES.xxxxl} height={SPACES.xxxxl} /> : 'Invite a Friend'}
          </Styled.GenerateLinkButton>

          <Styled.GeneratedLink title="Click to copy" onClick={onGeneratedLinkClick}>
            {invitationLink}
          </Styled.GeneratedLink>
        </>
      )}
    </Styled.HomeWrapper>
  );
};
