import styled from 'styled-components';

import { COLORS, FONTS } from '../../../../theme';
import { ISelectInput } from '../../types';
import arrow from '../../../../assets/icon/example/arrow.svg';
import { List } from '@mui/material';

export const InputSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
`;

export const Arrow = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${COLORS.black};
  -webkit-mask-image: url(${arrow});
  -webkit-mask-size: 100% 100%;
  -mask-image: url(${arrow});
`;

export const Span = styled.span<{ color?: string }>`
  font-family: ${FONTS.FAMILIES.roboto};
  font-weight: ${FONTS.WEIGHTS.normal};
  font-size: ${FONTS.SIZES.xxl};
  line-height: ${FONTS.SIZES.xxl};
  color: ${({ color }) => color ?? COLORS.black};
`;

export const SelectContainer = styled.div<Partial<ISelectInput>>`
  position: relative;
  width: ${({ widthSelect }) => widthSelect ?? '100%'};
  height: ${({ heightSelect }) => heightSelect ?? '40px'};
  display: flex;
  align-items: center;
 
  background:${({ backgroundColor }) => backgroundColor ?? COLORS.white},
  color: ${({ color }) => color ?? COLORS.black};

  margin-left: ${({ ml }) => ml ?? '0'};
  margin-right: ${({ mr }) => mr ?? '0'};
  margin-bottom: ${({ mb }) => mb ?? '0'};
  margin-top: ${({ mt }) => mt ?? '0'};
  
`;

export const ListStyled = styled(List)<{ maxHeightList?: string }>`
  max-height: ${({ maxHeightList }) => maxHeightList ?? '300px'};
`;
