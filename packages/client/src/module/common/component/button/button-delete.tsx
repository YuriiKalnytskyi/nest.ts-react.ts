import i18next from 'i18next';
import React, { useRef } from 'react';

import '../../../../styles/button.css';
import { IButtonDelete } from '../../types';
import * as Styled from './styled/button.styled';

export const ButtonDelete = ({ content, ...props }: IButtonDelete) => {
  const refBtn = useRef<HTMLButtonElement>(null);

  const onClick = () => {
    if (refBtn.current) {
      refBtn.current.classList.add('delete');
      setTimeout(() => refBtn.current && refBtn.current.classList.remove('delete'), 5000);
    }
  };

  return (
    <Styled.Button className='button' onClick={onClick} ref={refBtn} {...props}>
      <div className='trash'>
        <div className='top'>
          <div className='paper' />
        </div>
        <div className='box' />
        <div className='check'>
          <svg viewBox='0 0 8 6'>
            <polyline points='1 3.4 2.71428571 5 7 1' />
          </svg>
        </div>
      </div>
      <span>{typeof content === 'string' ? i18next.t(content) : content}</span>
    </Styled.Button>
  );
};
