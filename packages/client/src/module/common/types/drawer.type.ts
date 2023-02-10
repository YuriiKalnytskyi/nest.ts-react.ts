import { ReactNode } from 'react';

export interface IDrawerProps {
  slidePosition?: 'left' | 'right';
  contentPosition?: 'left' | 'right';
  className?: string;
  children: ReactNode;
  onClose: (arg: boolean) => void;
  open: boolean;
  component?: string;
}
