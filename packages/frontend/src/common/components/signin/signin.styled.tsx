import styled, { css } from 'styled-components';

const AuthWrapperStyle = css`
  margin-top: 56px;
  width: 360px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1080px) {
    width: 100vw;
  }
`;

export const AuthChoiceWrapper = styled.div`
  ${AuthWrapperStyle}
  padding: 8px 16px;
  & > p {
    color: #242424;
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    margin-bottom: 12px;
  }

  & > span {
    color: #767676;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    margin: 0 auto;
    margin-top: 40px;
    width: fit-content;
  }
`;

export const ChocheButton = styled.button`
  margin-top: 12px;
  border-radius: 8px;
  border: 1px solid #242424;
  background-color: transparent;
  padding: 12px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  & > p {
    color: #242424;
    text-align: center;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
`;

export const RedirectButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 12px 0px;
  cursor: pointer;
  & > p {
    color: #5133e6;
    text-align: center;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
`;

export const AuthEmailChoiceForm = styled.form`
  ${AuthWrapperStyle}
  padding: 16px;
  & > p {
    color: #242424;
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
  }

  & > input {
    border-radius: 8px;
    border: 1px solid #d1d1d1;
    margin-top: 16px;
    height: 56px;
    width: 100%;
    padding: 14px;
    ::placeholder {
      color: #949494;
      font-family: Roboto;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  & > button {
    cursor: pointer;
    margin-top: 16px;
    height: 48px;
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

  & > span {
    margin-top: 26px;
    color: #242424;
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
  }
`;
