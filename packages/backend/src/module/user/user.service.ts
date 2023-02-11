import { HttpException, HttpStatus, Injectable } from '@nestjs/common';import axios from 'axios';import ERROR_MESSAGES from 'src/constants/errors.en';import { User } from 'src/db/models';import { BaseAuthService } from '../common/services/base-auth.service';import {  BaseAuthDTO,  CreateUserDto,  CredLogUserDTO,  CredSignUserDTO,  LoginUserDto,  SocialDTO} from './dto';import { EAppRoles } from '../common/types';import { transform } from './utils';import { IdUserDTO } from '../common/dtos';@Injectable()export class UserService extends BaseAuthService {  async getGoogle(accessToken: string): Promise<BaseAuthDTO> {    const { data } = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {      headers: {        Authorization: `Bearer ${accessToken}`      }    });    return transform(data);  }  async getFacebook(accessToken: string): Promise<BaseAuthDTO> {    const { data } = await axios.get('https://graph.facebook.com/me', {      params: {        fields: ['picture', 'email', 'name'].join(','),        access_token: accessToken      }    });    data.picture = data.picture.data.url;    return transform(data);  }  async signInMedia({ accessToken, type }: SocialDTO): Promise<IdUserDTO> {    const data = await this[type](accessToken);    const user = await User.findOne({ where: { email: data.email } });    if (user) {      return { id: user.id, email: user.email };    }    const newUser = User.create<User>({ ...data });    const res = await User.save(newUser);    return { id: res.id, email: res.email };  }  async signUpCredentials(data: CredSignUserDTO): Promise<IdUserDTO> {    const user = await User.findOne({ where: { email: data.email } });    if (user) {      throw new HttpException(        { message: { en: ERROR_MESSAGES.DUPLICATE_USER } },        HttpStatus.BAD_REQUEST      );    }    const hashed = await this.encrypt(data.password);    const newUser = User.create({ ...data, password: hashed });    const res = await User.save(newUser);    return { id: res.id, email: res.email };  }  async signInCredentials(data: CredLogUserDTO): Promise<IdUserDTO> {    const user = await User.findOne({ where: { email: data.email } });    if (!user) {      throw new HttpException(        { message: { en: ERROR_MESSAGES.NOT_FOUND_USER } },        HttpStatus.BAD_REQUEST      );    }    if (!user.password) {      throw new HttpException(        { message: { en: ERROR_MESSAGES.SOCIAL_MEDIA } },        HttpStatus.BAD_REQUEST      );    }    const isValid = await this.validate(data.password, user.password);    if (!isValid) {      throw new HttpException(        {          message: { en: ERROR_MESSAGES.INVALID_PASSWORD }        },        HttpStatus.BAD_REQUEST      );    }    return { id: user.id, email: user.email };  }}