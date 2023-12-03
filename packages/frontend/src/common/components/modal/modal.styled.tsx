import styled from 'styled-components';
import { Modal } from '@mui/material';

const APP_MIN_MARGIN_LEFT_MODAL = 100;
const APP_MIN_MARGIN_RIGHT = 50;
const APP_WIDTH = 1080;

export const ModalWrapper = styled(Modal)<{ scrollX: number; isLeft?: boolean; isCenter?: boolean }>`
  display: flex;
  justify-content: ${({ isLeft, isCenter }) => (isCenter ? 'center' : isLeft ? 'flex-start' : 'flex-end')};
  align-items: start;
  ${({ isLeft, isCenter }) =>
    isCenter
      ? ''
      : isLeft
      ? `padding-left: calc(((100vw - ${APP_WIDTH}px) / 2) + ${APP_MIN_MARGIN_LEFT_MODAL}px);`
      : `padding-right: calc(((100vw - ${APP_WIDTH}px) / 2) + ${APP_MIN_MARGIN_RIGHT}px);`}

  @media (max-width: ${APP_WIDTH}px) {
    ${({ isLeft, scrollX, isCenter }) =>
      isCenter
        ? ''
        : isLeft
        ? `padding-left: calc(100vw - ${APP_WIDTH - APP_MIN_MARGIN_LEFT_MODAL}px + ${scrollX}px);`
        : `padding-right: calc(100vw - ${APP_WIDTH - APP_MIN_MARGIN_RIGHT}px + ${scrollX}px);`}
  }
`;

export const ChildrenWrapper = styled.div<{
  hideChildBackground?: boolean;
  hideChildeShadow?: boolean;
  isScrollDisabled?: boolean;
  isCenter?: boolean;
  isLeft?: boolean;
}>`
  position: relative;
  top: 100px;
  ${({ isCenter, isLeft }) => !isCenter && !isLeft && 'top: 50px;'}
  margin-bottom: 30px;
  max-height: calc(100vh - 100px);
  border-radius: 5px;
  ${({ hideChildBackground }) => !hideChildBackground && 'background: rgba(253, 253, 253, 0.8);'}
  ${({ hideChildeShadow }) => !hideChildeShadow && 'box-shadow: 0px 2px 30px 0px #e1e1e1;'}
  backdrop-filter: blur(1.5px);

  ${({ isScrollDisabled }) => !isScrollDisabled && 'overflow-y: scroll;'}

  -ms-overflow-style: none;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &:focus-visible {
    outline: none;
  }
`;
