import axios from 'axios';
import * as queryString from 'querystring';

import { ISignInSocialMedia } from '../../../types';

export const singUpForFacebook = (): string => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.REACT_APP_FACEBOOK_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_CLIENT_URL,
    scope: ['email', 'user_friends'].join(','), // comma seperated string
    response_type: 'code',
    auth_type: 'rerequest',
    display: 'popup',
    is_mobile: false
  });

  return `https://www.facebook.com/v6.0/dialog/oauth?${stringifiedParams}`;
};

export const getAccessTokenFacebook = async (code: string): Promise<ISignInSocialMedia> => {
  const { data } = await axios({
    url: 'https://graph.facebook.com/v6.0/oauth/access_token',
    method: 'get',
    params: {
      client_id: process.env.REACT_APP_FACEBOOK_CLIENT_ID,
      client_secret: process.env.REACT_APP_FACEBOOK_CLIENT_SECRET,
      redirect_uri: process.env.REACT_APP_CLIENT_URL,
      code
    }
  });

  console.log(data);

  return { accessToken: data.access_token, type: 'getFacebook' };
};
