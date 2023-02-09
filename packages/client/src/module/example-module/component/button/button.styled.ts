import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { IButtonProps, TNavLink, IButtonAppearances } from '../../types';
import { COLORS, SPACES, FONTS, TRANSITIONS } from '../../../../theme';

const style = css<IButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: ${({ width }) => width ?? 'initial'};
  height: ${({ height }) => height ?? 'initial'};

  padding: ${({ pads }) => pads ?? `${SPACES.xs} ${SPACES.l}`};
  margin-left: ${({ ml }) => ml ?? '0'};
  margin-right: ${({ mr }) => mr ?? '0'};
  margin-bottom: ${({ mb }) => mb ?? '0'};
  margin-top: ${({ mt }) => mt ?? '0'};

  font-weight: ${FONTS.WEIGHTS.semi_bold};
  border-radius: ${SPACES.xxxxxl};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  background-color: transparent;

  transition: all ${TRANSITIONS.duration.fast} ${TRANSITIONS.function.linear};
  cursor: pointer;

  &:disabled {
    cursor: initial;
    background-color: ${({ theme }) => theme.COLORS.gray50};
  }
`;

const buttonAppearances: IButtonAppearances = {
  primary: `
    background-color: ${COLORS.primaryRed};
    border: 1px solid ${COLORS.primaryRed};
    color: ${COLORS.white};

  &:hover,
  &:focus {
    background-color: ${COLORS.secondaryRed};
  }
  &:active {
    background-color: ${COLORS.lightPink};
    border-color: ${COLORS.lightPink};
  }
  &:disabled {
    background-color: ${COLORS.lightWhite};
    border-color: ${COLORS.lightWhite};
    color: ${COLORS.white};

    &:hover {
      pointer-events: none;
    }
  }
`,
  inverse: `
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.semiWhite};
  color: ${COLORS.semiTransparentWhite};

  &:hover,
  &:focus {
    background-color:${COLORS.semiWhite};
    color: ${COLORS.white};
  }
  &:active {
   background-color:${COLORS.semiWhite};
    border-color: ${COLORS.semiWhite} ;
    color: ${COLORS.white};
  }
  &:disabled {
    color: ${COLORS.semiWhite};
    border-color: ${COLORS.semiWhite};

    &:hover {
      background-color: inherit;
      pointer-events: none;
    }
  }
`
};

export const StyledButton = styled.button<IButtonProps>`
  ${style}
  ${({ variant }) => buttonAppearances[variant as keyof typeof buttonAppearances]}
`;

export const NavLink = styled(Link)<TNavLink>`
  text-decoration: none;
  color: inherit;
  ${style}
  ${({ variant }) => buttonAppearances[variant as keyof typeof buttonAppearances]}
`;
