import { SVGProps } from 'react';

export type TIconTypeProps = SVGProps<SVGSVGElement> & {
  width?: string;
  height?: string;
  fill?: string;
  position?: string;
};

export interface IInputProps {
  gapFromLabel?: string;
  label?: string;
  type?: string;
  name: string;
  height?: string;
  textarea?: boolean;
  checkbox?: boolean;
  radio?: boolean;
  placeholder?: string;
  value?: string;
  withIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  iconsStyles?: TIconTypeProps;
  innerPads?: string;
  required?: boolean;
  id?: string;
  readOnly?: boolean;
  placeholderColor?: string;
  className?: string;
  labelClassName?: string;
  maxLength?: number;
  mr?: string;
  ml?: string;
  mb?: string;
  mt?: string;
  inputType?: '1' | '2';
}

export interface IWProps {
  mr?: string;
  ml?: string;
  mb?: string;
  mt?: string;
}
