import { Select } from '@mui/material';
import styled from 'styled-components';

export const OwnBooksWrapper = styled.div`
  padding-top: 56px;
`;

export const PageTitleWraper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  & > h3 {
    margin-top: 20px;
    margin-bottom: 15px;
    font-family: Inter;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
  }
  & > span {
    font-weight: 300;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
  }
  & > button {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    background: #242424;
    & > p {
      margin: auto;
      color: #fff;
      text-align: center;
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
    }
  }
`;

export const CustomizeSelectFromMUI = styled(Select)`
  width: 150px;
  margin-top: 30px;
`;
