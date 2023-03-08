import i18n from 'i18next';
import React from 'react';

import closeIconImage from '../../../../assets/icon/closeIcon.svg';
import { ICloseButtonProps } from '../../types';
import * as Styled from './close-button.styled';

export const CloseButton = ({ width, height, ...props }: ICloseButtonProps) => (
  <Styled.Button {...props}>
    <Styled.CloseIcon
      src={closeIconImage}
      alt={i18n.t('alt.close_icon') as string}
      width={width}
      height={height}
    />
  </Styled.Button>
);
