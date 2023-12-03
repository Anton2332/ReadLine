import { Button } from '@mui/material';
import styled from 'styled-components';

export const AddOwnBookWrapper = styled.form`
  width: 400px;
  padding-top: 15px;
  background: white;
  display: flex;
  flex-direction: column;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  img {
    object-fit: cover;
    width: 100px;
    margin-left: 15px;
  }
  & > p {
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const CustomButton = styled(Button)``;
