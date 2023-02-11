export enum ESocialType {
  FACEBOOK = 'getFacebook',
  GOOGLE = 'getGoogle'
}

export interface ISocialResponse {
  name: string;
  email: string;
  picture: string;
}
