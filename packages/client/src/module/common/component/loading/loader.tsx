import React from 'react';
import * as Styled from './loading.styled';

export interface ILoaderProps {
  margin?: string;
  size?: 'small' | 'medium' | 'large' | 'btnSmall';
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  position?: string;
  translateX?: string;
  translateY?: string;
  color?: string;
  height?: string;
  className?: string;
  id?: string;
}

export const Loader = ({ size, margin, className, id, ...restProps }: ILoaderProps) => (
  <Styled.MyContainer id={id} margin={margin} className={className}>
    <Styled.Loader size={size ?? 'medium'} {...restProps} />
  </Styled.MyContainer>
);
