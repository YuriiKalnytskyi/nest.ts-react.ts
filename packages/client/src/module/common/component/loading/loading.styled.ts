import styled, { css } from 'styled-components';
import { COLORS } from '../../../../theme';
import { ILoaderProps } from '../../types';

const small = css`
  width: 2.375rem;
  height: 2.375rem;
`;
const medium = css`
  width: 4rem;
  height: 4rem;
`;
const large = css`
  width: 5.25rem;
  height: 5.25rem;
`;

export const MyContainer = styled.div<{ margin?: string }>`
  display: flex;
  justify-content: center;
  margin: ${({ margin }) => margin ?? 0};
`;

export const Loader = styled.div<ILoaderProps>`
  &:after {
    content: '';
    display: block;
    ${({ size }) => {
      switch (size) {
        case 'small':
          return small;
        case 'large':
          return large;
        default:
          return medium;
      }
    }}

    border-radius: 50%;
    border: ${({ color }) => `0.375rem solid  ${color ?? COLORS.primaryRed}`};
    border-color: ${({ color }) => `${color ?? COLORS.primaryRed} transparent
    ${color ?? COLORS.primaryRed} transparent`};
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
