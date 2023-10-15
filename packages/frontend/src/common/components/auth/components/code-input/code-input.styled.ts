import styled from 'styled-components';
import { FONTS } from '@/theme';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
`;

export const InputField = styled.input`
  width: 60px;
  height: 80px;
  text-align: center;
  font-family: ${FONTS.FAMILIES.ibmPlexSansHebrew};
  font-size: ${FONTS.SIZES.xxxxl};
  border: none;
  background: #f2f2f2;
  border-radius: 15px;
`;
