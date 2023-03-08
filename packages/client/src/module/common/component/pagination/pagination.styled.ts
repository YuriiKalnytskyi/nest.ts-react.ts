import styled, { css } from 'styled-components';

import { ReactComponent as ArrowLeftSvgIcon } from '../../../../assets/icon/example/arrow-left.svg';
import { ReactComponent as ArrowRightSvgIcon } from '../../../../assets/icon/example/arrow-right.svg';
import { COLORS, FONTS, SHADOWS, SPACES } from '../../../../theme';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${`${SPACES.m} ${SPACES.xxxxl}`};
  background-color: inherit;
`;

export const PaginateButtonsList = styled.ul`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${SPACES.xxxxxs};
  }
`;
export const PaginateButtonsListItem = styled.li``;

const buttonsCommonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
  margin: 0;
  font-weight: ${FONTS.WEIGHTS.semi_bold};
  font-size: ${FONTS.SIZES.m};
  box-shadow: ${SHADOWS.xs};
  color: ${COLORS.gray600};
  background-color: ${COLORS.white};
  cursor: pointer;
`;

export const PaginationButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  ${buttonsCommonStyles}
  border-radius: ${SPACES.xxs};

  &.selected {
    color: ${COLORS.gray800};
    background-color: ${COLORS.gray200};
  }
`;

const prevNextBtnStyles = css`
  ${buttonsCommonStyles}
  padding: ${`${SPACES.xxxs} ${SPACES.m}`};
  font-weight: ${FONTS.WEIGHTS.semi_bold};
  font-size: ${FONTS.SIZES.m};

  border: 1px solid;
  border-radius: ${SPACES.xxxxxl};

  &:disabled {
    color: ${COLORS.gray300};
    border-color: ${COLORS.gray300};
    cursor: initial;

    & > svg {
      color: ${COLORS.gray300};
    }
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

export const PrevPageButton = styled.button`
  ${prevNextBtnStyles}
  margin-right: auto;
`;

export const NextPageButton = styled.button`
  ${prevNextBtnStyles}
  margin-left: auto;
`;

export const ArrowLeftIcon = styled(ArrowLeftSvgIcon)`
  margin-right: ${SPACES.xxs};
`;

export const ArrowRightIcon = styled(ArrowRightSvgIcon)`
  margin-left: ${SPACES.xxs};
`;
