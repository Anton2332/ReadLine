import Image from 'next/image';
import styled from 'styled-components';

export const ImageWrapper = styled(Image)`
  margin: 4px;
  cursor: pointer;
`;

export const HeaderWrapper = styled.div`
  width: 1080px;
  height: 56px;
  margin: 0 auto;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${ImageWrapper}:first-child {
    width: 24px;
    height: 24px;
  }
  ${ImageWrapper}:last-child {
    width: 28px;
    height: 28px;
  }

  @media screen and (max-width: 1080px) {
    width: 100vw;
  }
`;
