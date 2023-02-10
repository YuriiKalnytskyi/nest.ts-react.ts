import React from 'react';
import * as Styled from './button.styled';
import { IButtonProps, TNavLink, IButtonWithIconProps } from '../../types';

export const Button = ({ content, type, id, variant = 'primary', ...restProps }: IButtonProps) => (
  <Styled.StyledButton id={id} type={type ?? 'button'} variant={variant} {...restProps}>
    {content}
  </Styled.StyledButton>
);

Button.AsNavLink = ({ content, variant = 'primary', ...restProps }: TNavLink) => (
  <Styled.NavLink variant={variant} {...restProps}>
    {content}
  </Styled.NavLink>
);

Button.WithTextAndIcon = ({ children, ...restProps }: IButtonWithIconProps) => (
  <Styled.StyledButton {...restProps}>{children}</Styled.StyledButton>
);
