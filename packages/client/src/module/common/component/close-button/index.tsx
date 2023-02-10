import React from 'react';
import i18n from 'i18next';

import { ICloseButtonProps } from '../../types';
import * as Styled from './close-button.styled';
import closeIconImage from '../../../../assets/icon/closeIcon.svg';

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
