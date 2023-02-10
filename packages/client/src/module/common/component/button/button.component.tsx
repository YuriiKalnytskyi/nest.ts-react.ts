import React from 'react';
import * as Styled from './button.styled';
import { IButtonProps, TNavLink, IButtonWithIconProps } from '../../types';
import i18next from 'i18next';

export const Button = ({ content, type, id, variant = 'primary', startIcon, endIcon, ...restProps }: IButtonProps) => (
  <Styled.StyledButton id={id} type={type ?? 'button'} variant={variant} {...restProps}>
    {startIcon && <Styled.Icon src={startIcon} alt={i18next.t('alt.icon') as string} {...restProps} />}
    {content}
    {endIcon && <Styled.Icon src={endIcon} alt={i18next.t('alt.icon') as string} {...restProps} />}
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
