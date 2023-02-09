import React, { FC } from 'react';
import i18next from 'i18next';
import { getIn, useFormikContext } from 'formik';

import * as Styled from './input.styled';
import { IInputProps } from '../../types';

export const Input: FC<IInputProps> = ({
  name,
  placeholder,
  type,
  maxWidth,
  margin,
  nameContainer,
  inputHeight
}) => {
  const { values, errors, handleChange } = useFormikContext();
  const isErrorExists = getIn(errors, name);

  return (
    <Styled.InputContainer maxWidth={maxWidth ?? '100%'} margin={margin}>
      {nameContainer && <Styled.NameContainer>{nameContainer}</Styled.NameContainer>}

      <Styled.Input
        $inputHeight={inputHeight}
        id={name}
        name={name}
        type={type}
        onChange={handleChange(name)}
        value={getIn(values, name) || ''}
        placeholder={placeholder}
      />
      {isErrorExists && (
        <Styled.ErrorInfoContainer>
          <Styled.ErrorInfoText>{i18next.t(getIn(errors, name))}</Styled.ErrorInfoText>
        </Styled.ErrorInfoContainer>
      )}
    </Styled.InputContainer>
  );
};
