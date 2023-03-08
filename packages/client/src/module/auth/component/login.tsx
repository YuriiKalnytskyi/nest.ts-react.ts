import React from 'react';

import { FONTS } from '../../../theme';
import { SignInSocialMedia } from '../common/sign-in-social-media/sign-in-social-media';
import { ESocialMedia } from '../constants';

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <SignInSocialMedia
        component={ESocialMedia.GOOGLE}
        margin={`${FONTS.SIZES.lxx} 0 ${FONTS.SIZES.s} 0`}
      />

      <SignInSocialMedia component={ESocialMedia.FACEBOOK} margin={`0 0 ${FONTS.SIZES.xxxxl} 0`} />
    </div>
  );
};
export default Login;
