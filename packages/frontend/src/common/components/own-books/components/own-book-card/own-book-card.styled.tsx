import { Button } from '@mui/material';
import Image from 'next/image';
import styled, { css } from 'styled-components';

const imgStyle = css`
  border-radius: 5px;
  width: 200px;
  height: calc(200px * 1.4);
  @media (max-width: 1080px) {
    width: 100%;
    height: calc(((100vw - 60px) / 5) * 1.6);
  }
  @media (max-width: 800px) {
    height: calc(((100vw - 40px) / 3) * 1.6);
  }
  @media (max-width: 600px) {
    height: calc(((100vw - 20px) / 2) * 1.6);
  }
  @media (max-width: 400px) {
    height: calc(100vw * 1.6);
  }
`;

export const OwnBookCardWrapper = styled.div`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  width: calc((100% - 80px) / 5);
  padding-bottom: 5px;
  @media screen and (max-width: 1080px) {
    width: calc((100% - 60px) / 4);
  }
  @media screen and (max-width: 800px) {
    width: calc((100% - 40px) / 3);
  }
  @media screen and (max-width: 600px) {
    width: calc((100% - 20px) / 2);
  }
  @media screen and (max-width: 400px) {
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > img {
    ${imgStyle}
  }

  & > div {
    background-color: black;
    ${imgStyle}
  }

  & > span {
    color: #767676;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
  }

  & > p {
    color: #525050;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
  }
`;

export const ProgressBarWrapper = styled.span<{ progress: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  border-radius: 5px;
  background-color: #8f8e8e;
  & > div {
    width: ${({ progress }) => progress}%;
    height: 100%;
    background-color: #4646ee;
    border-radius: 5px;
  }
`;

export const SettingsButton = styled(Button)`
  position: absolute;
  right: -10px;
  bottom: 5px;
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: block;
  height: 20px;
  max-width: 40px;
`;

export const TreeDots = styled(Image)`
  width: 16px;
  height: auto;
`;
