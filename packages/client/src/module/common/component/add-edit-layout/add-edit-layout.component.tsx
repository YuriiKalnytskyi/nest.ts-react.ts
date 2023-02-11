import React from 'react';
import i18n from 'i18next';

import giftIcon from '../../../../assets/icon/red-gift.svg';

import * as Styled from './add-edit-layout.styled';
import { IAddEditLayoutProps } from '../../types';

export const AddEditLayout = ({
  text,
  title,
  children,
  onCloseButtonClick,
  icon = giftIcon
}: IAddEditLayoutProps) => (
  <Styled.LayoutContainer>
    <Styled.IconContainer>
      <img id='giftIcon' src={icon} alt={i18n.t('alt.gift_icon') as string} />

      <Styled.HeaderContentWrapper>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Text>{text}</Styled.Text>
      </Styled.HeaderContentWrapper>

      <Styled.CloseBtn onClick={onCloseButtonClick} />
    </Styled.IconContainer>

    <Styled.ContentContainer>{children}</Styled.ContentContainer>
  </Styled.LayoutContainer>
);