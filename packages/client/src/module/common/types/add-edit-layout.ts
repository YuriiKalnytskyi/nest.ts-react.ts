export interface IAddEditLayoutConpainerProps {
  width?: string;
}

export interface IAddEditLayoutProps extends IAddEditLayoutConpainerProps {
  title?: string;
  text?: string;
  icon?: string;
  onCloseButtonClick?: () => void;
  children?: React.ReactNode;
}
