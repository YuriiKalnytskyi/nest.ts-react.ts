import styled from 'styled-components';
import { COLORS, FONTS, SPACES } from '../../../../theme';

export const Container = styled.div<{ margin: string }>`
  width: 100%;
  position: relative;
  max-width: 22.5rem;
  height: 2.75rem;
  border: 1px solid ${COLORS.semiWhite};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({ margin }) => margin};
`;

export const Image = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

export const Text = styled.span`
  margin-left: ${SPACES.s};
  color: ${COLORS.semiTransparentWhite};
  font-family: ${FONTS.FAMILIES.inter};
  font-style: normal;
  font-weight: ${FONTS.WEIGHTS.semi_bold};
  font-size: ${FONTS.SIZES.l};
  line-height: 1.5;
`;

export const AHref = styled.a`
  text-decoration: none;
`;
