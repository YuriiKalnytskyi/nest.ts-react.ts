import styled from 'styled-components';

import { ICloseAndMenu } from '../../../types';
import { COLORS } from '../../../../../theme';

export const CheckboxContainer = styled.div<ICloseAndMenu>`
  position: relative;
  --width: ${({ width }) => width ?? '28px'};
  --height: ${({ width }) => width ?? '28px'};
  width: var(--width);
  height: var(--height);
`;

export const Checkbox = styled.input<{ rotate: string }>`
  position: absolute;
  display: block;
  height: 100%;
  width: 100%;
  z-index: 5;
  opacity: 0;
  cursor: pointer;

  &:checked ~ .hamburger-lines .line1 {
    transform: rotate(${({ rotate }) => rotate});
  }

  &:checked ~ .hamburger-lines .line2 {
    transform: scaleY(0);
  }

  &:checked ~ .hamburger-lines .line3 {
    transform: rotate(-${({ rotate }) => rotate});
  }
`;

export const HamburgerLines = styled.div`
  height: calc(var(--width) - 6px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Line = styled.span<{ color?: string }>`
  display: block;
  height: calc(var(--width) / 8);
  width: 100%;
  border-radius: 10px;
  background: #0e2431;
  background: ${({ color }) => color ?? COLORS.darkBlueGrey};

  &.line1 {
    transform-origin: 0% 0%;
    transition: transform 0.4s ease-in-out;
  }

  &.line2 {
    transition: transform 0.2s ease-in-out;
  }

  &.line3 {
    transform-origin: 0% 100%;
    transition: transform 0.4s ease-in-out;
  }
`;
