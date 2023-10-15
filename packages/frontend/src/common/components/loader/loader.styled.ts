import styled from 'styled-components';
import { COLORS } from '@theme';
import { ILoaderPayload } from '@/common/types/loader.type';

export const Loader = styled.span<ILoaderPayload>`
  width: ${({ width }) => (width ? `${width}px` : '70px')};
  height: ${({ height }) => (height ? `${height}px` : '70px')};
  border: ${({ borderSize }) => (borderSize ? `${borderSize}px` : '5px')} solid ${({ color }) => color || COLORS.white};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;
