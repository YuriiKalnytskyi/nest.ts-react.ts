import styled from 'styled-components';

import { COLORS, FONTS, SPACES } from '../../../../theme';
import { IAddEditLayoutConpainerProps } from '../../types';
import { CloseButton } from '../close-button';

export const LayoutContainer = styled.div<IAddEditLayoutConpainerProps>`
  width: ${({ width }) => width ?? '22rem'};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${SPACES.xxl} ${SPACES.l} ${SPACES.l} ${SPACES.l};
  font-family: ${FONTS.FAMILIES.inter};
  background: ${COLORS.white};
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03);
  overflow-y: auto;

  #giftIcon {
    position: inherit;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: ${SPACES.xxxxl};
`;

export const CloseBtn = styled(CloseButton)`
  margin: 0 0 0 auto;
  width: 1.5rem;
  height: 1.5rem;
`;

export const Title = styled.strong`
  display: block;
  width: 100%;
  font-weight: ${FONTS.WEIGHTS.semi_bold};
  font-size: ${FONTS.SIZES.xl};
  color: ${COLORS.darkBlueGrey};
`;

export const Text = styled.p`
  width: 100%;
  font-size: ${FONTS.SIZES.m};
  color: ${COLORS.darkGrey};
`;

export const HeaderContentWrapper = styled.div`
  margin-left: ${({ theme }) => theme.SPACES.l};
`;

export const ContentContainer = styled.div`
  width: 100%;
`;
