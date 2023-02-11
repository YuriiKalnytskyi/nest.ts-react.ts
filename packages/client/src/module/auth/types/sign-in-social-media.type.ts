import { ESocialMedia } from '../constants';

export interface IArrayIcons {
  [key: string]: { icon: string; text: string; url: string };
}

export interface ISingUPProps {
  margin: string;
  component: ESocialMedia;
}
