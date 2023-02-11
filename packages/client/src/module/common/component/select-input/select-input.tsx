import React, { useState } from 'react';
import { Button, List, ListItem, Popover } from '@mui/material';
import { useFormikContext } from 'formik';
import i18next from 'i18next';

import { COLORS, SPACES } from '../../../../theme';
import { inputConstSearch, labelConst } from '../../constants';

import * as InputStyled from '../input/input.styled';
import * as Styled from './select-input.styled';
import { ISelectInput } from '../../types';

export const SelectInput = ({
  array,
  label,
  isSearch = false,
  inputType = '2',
  vertical = 'top',
  horizontal = 'right',
  backgroundColor,
  color,
  name,
  ...props
}: ISelectInput) => {
  const { values, setValues } = useFormikContext<{ [name: string]: string }>();

  const [search, setSearch] = useState<string>('');
  const [menuAnchor, setMenuAnchor] = useState<
    (EventTarget & HTMLInputElement) | (EventTarget & HTMLButtonElement) | null
  >(null);

  const all = array.filter((value: string) =>
    i18next.t(value).toLocaleLowerCase().includes(search.toLowerCase())
  );

  const changeItem = (item: string) => {
    setValues({ [name]: item });
    setMenuAnchor(null);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const position = { vertical, horizontal };

  return (
    <Styled.SelectContainer {...props}>
      <Button
        onClick={({ currentTarget }) => {
          setMenuAnchor(currentTarget);
        }}
        style={{
          width: '100%',
          height: '100%',
          background: backgroundColor ?? COLORS.white,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: `1px solid ${COLORS.semiWhite}`,
          borderRadius: '10px'
        }}
      >
        <Styled.Span color={color}>
          {i18next.t(values.selectValue ? values.selectValue : label)}
        </Styled.Span>
        <Styled.Arrow />
      </Button>
      <Popover
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={position}
        transformOrigin={position}
      >
        <List>
          {isSearch && (
            <Styled.InputSearchContainer>
              {inputType === '1' && (
                <InputStyled.Label htmlFor={labelConst.name}>
                  {i18next.t(labelConst.text)}
                </InputStyled.Label>
              )}
              {inputType === '1' ? (
                <InputStyled.Input value={search} onChange={onChange} {...inputConstSearch} />
              ) : (
                <InputStyled.Input2 value={search} onChange={onChange} {...inputConstSearch} />
              )}
              {inputType === '2' && (
                <InputStyled.Label2 pl={SPACES.l} htmlFor={labelConst.name}>
                  {i18next.t(labelConst.text)}
                </InputStyled.Label2>
              )}
            </Styled.InputSearchContainer>
          )}

          {all.map((item: string) => (
            <ListItem
              button
              key={item}
              onClick={() => {
                changeItem(item);
              }}
            >
              <Styled.Span color={color}>{i18next.t(item)}</Styled.Span>
            </ListItem>
          ))}
        </List>
      </Popover>
    </Styled.SelectContainer>
  );
};
