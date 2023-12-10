import { Popover } from '@mui/material';
import styled from 'styled-components';

export const AllOwnBooksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 40px;
  padding: 0 15px;
`;

export const PopoverCustome = styled(Popover)`
  div {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
