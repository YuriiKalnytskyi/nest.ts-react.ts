import * as queryString from 'querystring';
import axios from 'axios';

import { ISignInSocialMedia } from '../../../types';

export const singUpForGoogle = (): string => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_CLIENT_URL,

    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ].join(' '), // space seperated string
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent'
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
};

export const getAccessTokenGoogle = async (code: string): Promise<ISignInSocialMedia> => {
  const { data } = await axios({
    url: 'https://www.googleapis.com/oauth2/v4/token',
    method: 'post',
    data: {
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.REACT_APP_CLIENT_URL,
      grant_type: 'authorization_code',
      code
    }
  });

  return {
    accessToken: data.access_token,
    type: 'getGoogle'
  };
};
