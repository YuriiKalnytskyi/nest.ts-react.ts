import React, { useRef } from 'react';
import i18next from 'i18next';

import { IButtonAdd } from '../../types';

import * as Styled from './styled/button-add';

export const ButtonAdd = ({ content = 'text', ...props }: IButtonAdd) => {
  const button = useRef<HTMLButtonElement>(null);

  const onClick = () => {
    if (button.current && !button.current.classList.contains('loading')) {
      button.current.classList.add('loading');
      setTimeout(() => button.current && button.current.classList.remove('loading'), 3700);
    }
  };

  return (
    <Styled.ButtonAdd className='ButtonAdd' onClick={onClick} {...props} ref={button}>
      <Styled.Span>{typeof content === 'string' ? i18next.t(content) : content}</Styled.Span>
      <Styled.Cart className='cart'>
        <Styled.Svg viewBox='0 0 36 26'>
          <Styled.Polyline points='1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5' />
          <Styled.Polyline points='15 13.5 17 15.5 22 10.5' />
        </Styled.Svg>
      </Styled.Cart>
    </Styled.ButtonAdd>
  );
};
