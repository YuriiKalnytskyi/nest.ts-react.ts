import styled from 'styled-components';
import { IConfirmationPopupContainerProps } from '../../types/confirmation-popup.type';
import { CloseButton } from '../close-button';
import { COLORS, FONTS, SPACES } from '../../../../theme';

export const Container = styled.div<IConfirmationPopupContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${SPACES.xxl} ${SPACES.l} ${SPACES.l} ${SPACES.l};
  width: ${({ width }) => width ?? '21.375rem'};
  font-family: ${FONTS.FAMILIES.inter};
  border-radius: 12px;
  background: ${COLORS.white};
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03);

  margin-left: auto;
  margin-right: auto;
  margin-top: ${SPACES.percent4};

  #icon {
    position: inherit;
  }

  & button:nth-of-type(1) {
    margin-bottom: ${SPACES.s};
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding-bottom: ${SPACES.xxs};
`;

export const CloseBtn = styled(CloseButton)`
  margin: 0;
`;

export const Title = styled.strong`
  display: block;
  margin-bottom: ${SPACES.xxs};
  font-weight: ${FONTS.WEIGHTS.semi_bold};
  font-size: ${FONTS.SIZES.xl};
  color: ${COLORS.darkBlueGrey};
`;

export const Text = styled.p`
  margin-bottom: ${SPACES.xxxxl};
  font-size: ${FONTS.SIZES.m};
  color: ${COLORS.darkGrey};
`;
