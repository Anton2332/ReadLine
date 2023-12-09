import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
`;

export const ChildWrapper = styled.div`
  width: 1080px;
  margin: 0 auto;
  @media screen and (max-width: 1080px) {
    width: 100vw;
  }
`;
