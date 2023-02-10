import React from 'react';

import { ICloseAndOther } from '../../types';
import '../../../../styles/close-and-other.css';

export const CloseAndOther = ({ hoverColor, transformRotate = false }: ICloseAndOther) => {

  return (
    <label className={'closeAndOther'}
           style={
             transformRotate ?
               { transform: 'rotate(0deg)' } :
               { transform: 'rotate(-90deg)' }
           }>
      <input className={'checkboxInput'} type='checkbox' />
      <svg viewBox='0 0 100 100'>
        <circle
          className='circle'
          cx='50' cy='50' r='30'
          style={{ fill: hoverColor ?? '' }}
        />
        <path className='svgPath lone--1' d='M0 40h62c13 0 6 28-4 18L35 35' />
        <path className='svgPath lone--2' d='M0 50h70' />
        <path className='svgPath lone--3' d='M0 60h62c13 0 6-28-4-18L35 65' />
      </svg>
    </label>
  );
};
