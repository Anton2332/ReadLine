import styled from 'styled-components';
import { COLORS, FONTS, SPACES } from '@/theme';

export const HomeWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(110.01deg, rgba(30, 52, 249, 0.75) 0%, rgba(0, 107, 153, 0.75) 66.67%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5rem;
`;

export const GenerateLinkButton = styled.button`
  font-size: 16px;
  line-height: 16px;
  width: 161px;
  height: 46px;
  border: none;
  border-radius: 5px;
  background: ${COLORS.halfTransparentWhite};
  color: ${COLORS.white};
  letter-spacing: ${SPACES.mediumLetterSpacing};
  font-family: ${FONTS.FAMILIES.robotoFlex};
  cursor: pointer;
`;

export const GeneratedLink = styled.div`
  font-size: 16px;
  line-height: 16px;
  max-width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${COLORS.white};
  letter-spacing: ${SPACES.mediumLetterSpacing};
  font-family: ${FONTS.FAMILIES.robotoFlex};
  cursor: pointer;
`;

export const ActionWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 1rem;
`;
