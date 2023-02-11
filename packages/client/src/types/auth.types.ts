export interface ISignInCredentials {
  email: string;
  password: string;
}

export interface ISignInSocialMedia {
  accessToken: string;
  type: string;
}

export interface ISignUpCredentials {
  email: string;
  password: string;
  username: string;
  photo?: string;
}
