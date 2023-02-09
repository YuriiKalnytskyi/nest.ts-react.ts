import styled from 'styled-components';
import { FONTS, COLORS, SPACES } from '../../../../theme';

export const InputContainer = styled.div<{ maxWidth: string; margin: string }>`
  margin: ${({ margin }) => margin};
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input<{ $inputHeight?: string }>`
  width: 100%;
  height: ${({ $inputHeight }) => $inputHeight || '2.75rem'};
  background: ${COLORS.white};
  border: 1px solid #000;
  border-radius: 0.5rem;
  padding-left: ${SPACES.m};
  outline: none;
  &:focus {
    outline: none;
  }
`;

export const NameContainer = styled.span`
  margin-bottom: ${FONTS.SIZES.xxxs};
  font-family: ${FONTS.FAMILIES.inter};
  font-style: normal;
  font-weight: ${FONTS.WEIGHTS.medium};
  font-size: ${FONTS.SIZES.m};
  line-height: ${FONTS.SIZES.xxl};
`;

export const ErrorInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ErrorInfoText = styled.div`
  box-sizing: border-box;
  font-family: ${FONTS.FAMILIES.inter};
  font-style: normal;
  font-weight: ${FONTS.WEIGHTS.normal};
  font-size: ${FONTS.SIZES.m};
  line-height: ${FONTS.SIZES.xxl};
  color: red;
`;

export const Label = styled.span``;
export const Input2 = styled.input``;


