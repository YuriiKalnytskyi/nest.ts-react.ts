import { Body } from '@nestjs/common';import { ApiController, ApiPost } from '../common/decorators';import { TokenDTO } from '../common/dtos';import { EAppRoles } from '../common/types';import { CredLogUserDTO, CredSignUserDTO, SocialDTO } from './dto';import { UserService } from './user.service';@ApiController('user-auth')export class UserController {  constructor(private userAuthService: UserService) {}  @ApiPost('sign-up/social-media', 'sing in user via social media', TokenDTO)  async logInSocial(@Body() data: SocialDTO): Promise<TokenDTO> {    const res = await this.userAuthService.signInMedia(data);    return this.userAuthService.generateToken({      role: EAppRoles.USER,      ...res    });  }  @ApiPost('sign-in/credentials', 'sing in via credentials', TokenDTO)  async logInCred(@Body() data: CredLogUserDTO): Promise<TokenDTO> {    const res = await this.userAuthService.signInCredentials(data);    return this.userAuthService.generateToken({      role: EAppRoles.USER,      ...res    });  }  @ApiPost('sign-up/credentials/:lang', 'sign up via credentials', TokenDTO)  async logUpCred(@Body() data: CredSignUserDTO): Promise<TokenDTO> {    const res = await this.userAuthService.signUpCredentials(data);    return this.userAuthService.generateToken({      role: EAppRoles.USER,      ...res    });  }}