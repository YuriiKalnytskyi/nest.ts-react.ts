import styled from 'styled-components';

import { COLORS, FONTS, SPACES } from '../../../../../theme';
import { IButtonAdd } from '../../../types';

export const ButtonAdd = styled.button<IButtonAdd>`
  --background: ${({ background }) => background ?? COLORS.primaryRed};
  --text: ${({ textColor }) => textColor ?? COLORS.white};
  --cart: ${({ cartColor }) => cartColor ?? COLORS.white};
  --tick: var(--background);

  width: ${({ width }) => width ?? '100%'};
  height: ${({ height }) => height ?? '40px'};

  margin-left: ${({ ml }) => ml ?? '0'};
  margin-right: ${({ mr }) => mr ?? '0'};
  margin-bottom: ${({ mb }) => mb ?? '0'};
  margin-top: ${({ mt }) => mt ?? '0'};

  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: none;

  padding: ${SPACES.xxs} ${SPACES.lx};
  border-radius: ${SPACES.xxxxxl};

  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: var(--text);
  background: var(--background);
  transform: scale(var(--scale, 1));
  transition: transform 0.4s cubic-bezier(0.36, 1.01, 0.32, 1.27);

  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-mask-image: -webkit-radial-gradient(white, black);

  &:active {
    --scale: 0.95;
  }

  &.loading {
    --scale: 0.95;
    --span-y: -32px;
    --icon-r: 180deg;
    --fill: 1;
    --fill-d: 0.8s;
    --offset: 0;
    --offset-d: 1.73s;
  }

  &.loading > .cart {
    animation: cart2 3.4s linear forwards 0.2s;
  }

  @keyframes cart2 {
    12.5% {
      transform: translateX(-60px) rotate(-18deg);
    }
    25%,
    45%,
    55%,
    75% {
      transform: none;
    }
    50% {
      transform: scale(0.9);
    }
    44%,
    56% {
      transform-origin: 12px 23px;
    }
    45%,
    55% {
      transform-origin: 50% 50%;
    }
    87.5% {
      transform: translateX(70px) rotate(-18deg);
    }
    100% {
      transform: translateX(140px) rotate(-18deg);
    }
  }
`;

export const Span = styled.span`
  font-size: ${FONTS.SIZES.l};
  font-weight: ${FONTS.WEIGHTS.medium};
  line-height: 1.5;

  display: block;
  position: relative;
  padding-left: 24px;

  transform: translateY(var(--span-y, 0));
  transition: transform 0.7s ease;

  &:before,
  &:after {
    content: '';
    width: var(--w, 2px);
    height: var(--h, 14px);
    border-radius: 1px;
    position: absolute;
    left: var(--l, 8px);
    top: var(--t, 6px);
    background: currentColor;
    transform: scale(0.75) rotate(var(--icon-r, 0deg)) translateY(var(--icon-y, 0));
    transition: transform 0.65s ease 0.05s;
  }

  &:after {
    --w: 14px;
    --h: 2px;
    --l: 2px;
    --t: 12px;
  }
`;

export const Cart = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -13px 0 0 -18px;
  transform-origin: 12px 23px;
  transform: translateX(-120px) rotate(-18deg);

  &:before,
  &:after {
    content: '';
    position: absolute;
  }

  &:after {
    width: 16px;
    height: 9px;
    background: var(--cart);
    left: 9px;
    bottom: 7px;
    transform-origin: 50% 100%;
    transform: perspective(4px) rotateX(-6deg) scaleY(var(--fill, 0));
    transition: transform 1.2s ease var(--fill-d);
  }

  &:before {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    box-shadow: inset 0 0 0 2px var(--cart);
    bottom: 0;
    left: 9px;
    filter: drop-shadow(11px 0 0 var(--cart));
  }
`;

export const Svg = styled.svg`
  z-index: 1;
  width: 36px;
  height: 26px;
  display: block;
  position: relative;
  fill: none;
  stroke: var(--cart);
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

export const Polyline = styled.polyline`
  &:last-child {
    stroke: var(--tick);
    stroke-dasharray: 10px;
    stroke-dashoffset: var(--offset, 10px);
    transition: stroke-dashoffset 0.4s ease var(--offset-d);
  }
`;
