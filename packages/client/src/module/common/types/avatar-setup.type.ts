import { DefaultTFuncReturn } from 'i18next';

export interface IAvatarSetup {
  label: string;
  avatar?: string | null;
  noAvatarWarning?: DefaultTFuncReturn;
  handleAvatarUpload: (file: File) => void;
  delAvatar: () => void;
}
