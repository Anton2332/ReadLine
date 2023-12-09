import Link from 'next/link';
import styled from 'styled-components';

export const ToolbarWrapper = styled.header`
  width: 1080px;
  height: 56px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  background-color: white;
  z-index: 999;
  @media screen and (max-width: 1080px) {
    width: 100vw;
  }
`;

export const LogoAndToolbarListWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ToolbarList = styled.div`
  display: flex;
  gap: 24px;
  margin-left: 30px;
`;

export const ToolbarListItem = styled(Link)<{ isactive: string }>`
  color: #949494;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;

  cursor: pointer;
  ${({ isactive }) => isactive === 'true' && 'color: black;'}
`;

export const LogInButton = styled.button`
  border: none;
  border-radius: 8px;
  background: #242424;
  padding: 6px 8px;
  cursor: pointer;

  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;
