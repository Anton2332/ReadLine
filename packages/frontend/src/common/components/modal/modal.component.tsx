import React, { ReactNode } from 'react';
import { Slide } from '@mui/material';
import * as Styled from './modal.styled';
import { useScrollX } from '@/common/hooks/use-scroll';

interface IModalComponent {
  open: boolean;
  closeHandler: () => void;
  children: ReactNode;
  className?: string;
  isLeft?: boolean;
  isCenter?: boolean;
  hideChildBackground?: boolean;
  hideChildeShadow?: boolean;
  isScrollDisabled?: boolean;
}

export const ModalComponent = ({
  open,
  closeHandler,
  children,
  className,
  isLeft,
  isCenter,
  hideChildBackground,
  hideChildeShadow,
  isScrollDisabled
}: IModalComponent) => {
  const { data: scrollX } = useScrollX();

  return (
    <Styled.ModalWrapper
      open={open}
      closeAfterTransition
      onClose={closeHandler}
      // componentsProps={{ backdrop: { style: { backgroundColor:  } } }}
      scrollX={scrollX || 0}
      isLeft={isLeft}
      isCenter={isCenter}
    >
      <Slide direction="left" in={open} timeout={0.5}>
        <Styled.ChildrenWrapper
          className={className}
          isScrollDisabled={isScrollDisabled}
          hideChildBackground={hideChildBackground}
          hideChildeShadow={hideChildeShadow}
          isCenter={isCenter}
          isLeft={isLeft}
        >
          {children as any}
        </Styled.ChildrenWrapper>
      </Slide>
    </Styled.ModalWrapper>
  );
};
