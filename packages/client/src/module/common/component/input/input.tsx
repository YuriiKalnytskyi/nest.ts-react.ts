import React, { useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import i18next from 'i18next';
import { IInputProps } from '../../types';
import { SPACES } from '../../../../theme';
import * as Styled from './input.styled';

export const Input = ({
  name,
  label,
  gapFromLabel,
  textarea,
  checkbox,
  radio,
  withIcon,
  iconsStyles,
  innerPads,
  required,
  className,
  type = 'text',
  labelClassName,
  inputType = '1',
  ...props
}: IInputProps) => {
  const [field, { touched, error }] = useField(name);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const shoudRenderInput = !checkbox && !textarea && !radio;

  const svgStyles = { ...Styled.defaultSvgStyles, ...iconsStyles };
  const pads =
    (withIcon ? `${SPACES.xs} ${SPACES.lxxs}` : innerPads) ||
    (type === 'password' ? `${SPACES.xs} ${SPACES.lxxs} ${SPACES.xs} ${SPACES.m}`: undefined );

  const [types, setTypes] = useState(type)
  const [isPassword, setIsPassword]=useState(false)

  useEffect(()=> {
    if (type === 'password' && isPassword){
      setTypes('text')
    }else {
      setTypes(type)
    }
  },[type, isPassword])

  const onClickPassword = () => {
    setIsPassword(!isPassword);
  };

  return (
    <Styled.Wrapper className={className} {...props}>
      {label && inputType === '1' && (
        <Styled.Label required={required} htmlFor={name} className={labelClassName}>
          {label}
        </Styled.Label>
      )}

      {shoudRenderInput &&  inputType === '1' ?
        <Styled.Input
          id={name}
          gapFromLabel={gapFromLabel}
          innerPads={pads}
          inputType={inputType}
          type={types}
          {...field}
          {...props}
        />
        :
        <Styled.Input2
          id={name}
          type={types}
          required
          {...field}
          {...props}
        />
      }

      {label && inputType === '2' &&
        <Styled.Label2 htmlFor={name} className={labelClassName}>
          {label}
        </Styled.Label2>
      }



      {withIcon && React.createElement(withIcon, svgStyles)}
      {
        type === 'password' && ( isPassword ?
          <Styled.Visibility
            inputType={inputType}
            onClick={onClickPassword}
          /> :
          <Styled.VisibilityOff
            inputType={inputType}
            onClick={onClickPassword}
          />
        )
      }

      {textarea && (
        <Styled.Textarea
          id={name}
          innerPads={pads}
          gapFromLabel={gapFromLabel}
          ref={textAreaRef}
          {...field}
          {...props}
        />
      )}

      {touched && error && <Styled.Error>{i18next.t(error)}</Styled.Error>}
    </Styled.Wrapper>
  );
};
