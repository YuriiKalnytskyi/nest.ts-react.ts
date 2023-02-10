import React, { useRef } from 'react';

import '../../../../styles/button-delete.css';
import * as Styled from './button.styled';
import { IButtonDelete } from '../../types';

export const ButtonDelete = ({...props}: IButtonDelete ) => {
  const refBtn = useRef<HTMLButtonElement>(null);

  const onClick = () => {
    if (refBtn.current) {
      refBtn.current.classList.add('delete');
      setTimeout(() => refBtn.current && refBtn.current.classList.remove('delete'), 5000);
    }
  };

  return (
    <Styled.Button
      className='button'
      onClick={onClick}
      ref={refBtn}
      {...props}
    >
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
      <span>Delete Item</span>
    </Styled.Button>
  );
};
