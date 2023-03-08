import i18n from 'i18next';
import React from 'react';

import addAvatar from '../../../../assets/icon/example/add-avatar.svg';
import { IAvatarSetup } from '../../types/avatar-setup.type';
import * as Styled from './avatar-setup.styled';

export const AvatarSetup = ({ label, avatar, handleAvatarUpload, delAvatar }: IAvatarSetup) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleAvatarUpload(file);
  };

  return (
    <Styled.OptionBlock>
      <Styled.FieldLabel>{label}</Styled.FieldLabel>
      <Styled.AvatarContainer>
        {avatar ? (
          <Styled.Avatar src={avatar} alt={i18n.t('alt.avatar') as string} key={avatar} />
        ) : null}

        {!avatar && (
          <>
            <label htmlFor='field-upload'>
              <Styled.AddAvatar src={addAvatar} alt={i18n.t('alt.avatar') as string} />
            </label>
            <input id='field-upload' type='file' accept='image/*' onChange={onChange} title='' />
          </>
        )}
        {avatar && <Styled.CloseButton onClick={delAvatar}>&#10006;</Styled.CloseButton>}
      </Styled.AvatarContainer>
      {/* Will be needed soon */}
      {/* <Styled.Text>{noAvatarWarning}</Styled.Text> */}
    </Styled.OptionBlock>
  );
};
