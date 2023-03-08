import { AxiosError } from 'axios';
import i18next from 'i18next';
import * as queryString from 'querystring';
import React, { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { redirect, useLocation } from 'react-router-dom';

import facebookIcon from '../../../../assets/icon/social-media/facebookIcon.svg';
import googleIcon from '../../../../assets/icon/social-media/googleIcon.svg';
import { authService } from '../../../../services';
import { ISignInSocialMedia } from '../../../../types';
import { APP_KEYS } from '../../../common/constants';
import { IToken } from '../../../common/types';
import { IArrayIcons, ISingUPProps } from '../../types';
import {
  getAccessTokenFacebook,
  getAccessTokenGoogle,
  singUpForFacebook,
  singUpForGoogle
} from '../../utils';
import * as Styled from './sign-in-social-media.styled';

export const SignInSocialMedia = ({ component, margin }: ISingUPProps) => {
  const location = useLocation();
  const googleLoginUrl = singUpForGoogle();
  const facebookLoginUrl = singUpForFacebook();

  const urlParams = queryString.parse(location.search);

  function errorHandler(e: any) {
    if (e.response.data.message.includes('This authorization code has been used.')) {
      location.search = '';
    } else if (e.response.data.message.includes('Bad Request')) {
      e.response.data.message = 'something went wrong';
    }
    toast.error(e.response.data.message);
  }

  const onSuccess = async ({ token }: IToken) => {
    localStorage.setItem(APP_KEYS.STORAGE_KEYS.TOKEN, token);
    redirect(APP_KEYS.ROUTER_KEYS.EXAMPLE);
  };

  const signUpSocial = useMutation<any, AxiosError, ISignInSocialMedia>(
    (req: ISignInSocialMedia) => authService.signInSocialMedia(req),
    {
      onSuccess,
      onError: errorHandler
    }
  );

  const googleGetToken = useMutation<ISignInSocialMedia, AxiosError, string>(
    (req: string) => getAccessTokenGoogle(req),
    {
      onSuccess: (res) => signUpSocial.mutate(res),
      onError: errorHandler
    }
  );

  const facebookGetToken = useMutation<ISignInSocialMedia, AxiosError, string>(
    (req: string) => getAccessTokenFacebook(req),
    {
      onSuccess: (res) => {
        signUpSocial.mutate(res);
      },
      onError: errorHandler
    }
  );

  useEffect(() => {
    if (location.search) {
      const code = urlParams['?code'] as string;

      if (location.search.includes('google')) {
        googleGetToken.mutate(code);
      } else {
        facebookGetToken.mutate(code);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const arrayIcons: IArrayIcons = {
    google: {
      icon: googleIcon,
      text: i18next.t('auth.common_google'),
      url: googleLoginUrl
    },
    facebook: { icon: facebookIcon, text: i18next.t('auth.common_facebook'), url: facebookLoginUrl }
  };

  const { icon, text, url } = arrayIcons[component];

  return (
    <Styled.AHref href={url}>
      <Styled.Container margin={margin}>
        <Styled.Image src={icon} alt={component} />
        <Styled.Text>
          {location.pathname === '/'
            ? i18next.t('auth.common_sign_in')
            : i18next.t('auth.common_sign_up')}{' '}
          {text}
        </Styled.Text>
      </Styled.Container>
    </Styled.AHref>
  );
};
