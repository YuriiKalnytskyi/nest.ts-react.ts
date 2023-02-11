import { HttpFactoryService, HttpService } from '../module/common/services';
import { ExpectedFromQuery, IToken } from '../module/common/types';
import { ISignInCredentials, ISignInSocialMedia, ISignUpCredentials } from '../types';

class AuthService {
  constructor(private httpService: HttpService) {}

  async signUpCredentials(data: ISignUpCredentials): Promise<ExpectedFromQuery<IToken>> {
    return this.httpService.post<IToken, ISignUpCredentials>(`user-auth/sign-up/credentials`, data);
  }

  async signInCredentials(data: ISignInCredentials): Promise<ExpectedFromQuery<IToken>> {
    return this.httpService.post<IToken, ISignInCredentials>('user-auth/sign-in/credentials', data);
  }

  async signInSocialMedia(data: ISignInSocialMedia): Promise<ExpectedFromQuery<IToken>> {
    return this.httpService.post<IToken, ISignInSocialMedia>(
      `user-auth/sign-up/social-media`,
      data
    );
  }
}

const factory = new HttpFactoryService();
export const authService = new AuthService(factory.createHttpService());
