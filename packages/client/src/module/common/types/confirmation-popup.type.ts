export interface IConfirmationPopupContainerProps {
  width?: string;
}

export interface IConfirmationPopup extends IConfirmationPopupContainerProps {
  title: string;
  text: string;
  confirmButtonContent?: string;
  cancelButtonContent?: string;
  onConfirm: (value: string) => void;
  onClose: () => void;
  isOpen: boolean;
}
