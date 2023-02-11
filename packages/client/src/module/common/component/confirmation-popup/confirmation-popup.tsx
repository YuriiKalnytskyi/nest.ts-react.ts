import React from 'react';
import i18n from 'i18next';
import { Modal } from '@mui/material';

import { IConfirmationPopup } from '../../types/confirmation-popup.type';
import * as Styled from './confirmation-popup.styled';
import giftIcon from '../../../../assets/icon/giftIcon.svg';

import '../../../../styles/confirmation-popup.css';

export const ConfirmationPopup = ({
  title,
  text,
  onConfirm,
  onClose,
  confirmButtonContent,
  cancelButtonContent,
  width,
  isOpen
}: IConfirmationPopup) => (
  <Modal open={isOpen}>
    <div className={'confirm_purchase'} onClick={onClose}>
      <Styled.Container
        width={width}
        onClick={(event: React.MouseEvent<HTMLButtonElement | Element, MouseEvent>) =>
          event.stopPropagation()
        }
      >
        <Styled.IconContainer onClick={onClose}>
          <img id={i18n.t('alt.icon') as string} src={giftIcon} alt='gift-icon' />
          <Styled.CloseBtn />
        </Styled.IconContainer>

        <Styled.Title>{title}</Styled.Title>
        <Styled.Text>{text}</Styled.Text>
      </Styled.Container>
    </div>
  </Modal>
);
