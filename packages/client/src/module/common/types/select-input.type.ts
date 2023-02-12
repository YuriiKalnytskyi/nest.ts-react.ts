export interface ISelectInput {
  array: string[];
  label: string;
  name: string;
  widthSelect?: string;
  heightSelect?: string;
  inputType?: '1' | '2';
  isSearch?: boolean;
  maxHeightList?: string;

  vertical?: 'top' | 'center' | 'bottom';
  horizontal?: 'left' | 'center' | 'right';

  backgroundColor?: string;
  color?: string;
  mr?: string;
  ml?: string;
  mb?: string;
  mt?: string;
}
