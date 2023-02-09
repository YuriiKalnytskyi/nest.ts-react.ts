import { ReactNode } from 'react';
import { LinkProps } from 'react-router-dom';

export interface IButtonProps {
  id?: string;
  content?: string | ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'inverse';
  width?: string;
  height?: string;
  pads?: string;
  mr?: string;
  ml?: string;
  mb?: string;
  mt?: string;
  children?: ReactNode;
}

export type TNavLink = LinkProps & IButtonProps;

export interface IButtonAppearances {
  primary: string;
  inverse: string;
}

export type IButtonWithIconProps = Omit<IButtonProps, 'content'>;
