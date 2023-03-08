import { Injectable } from '@nestjs/common';import axios from 'axios';import { Users } from '../../db/models';import { IdDTO, IdUserDTO } from '../common/dtos';import { ErrorHandler } from '../common/errors';import { BaseAuthService } from '../common/services/base-auth.service';import { BaseAuthDTO, CredLogUserDTO, CredSignUserDTO, SocialDTO } from './dto';import { transform } from './utils';@Injectable()export class UserService extends BaseAuthService {  async getGoogle(accessToken: string): Promise<BaseAuthDTO> {    const { data } = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {      headers: {        Authorization: `Bearer ${accessToken}`      }    });    return transform(data);  }  async getFacebook(accessToken: string): Promise<BaseAuthDTO> {    const { data } = await axios.get('https://graph.facebook.com/me', {      params: {        fields: ['picture', 'email', 'name'].join(','),        access_token: accessToken      }    });    data.picture = data.picture.data.url;    return transform(data);  }  async signInMedia({ accessToken, type }: SocialDTO): Promise<IdUserDTO> {    const data = await this[type](accessToken);    const user = await Users.findOne({ where: { email: data.email } });    if (user) {      return { id: user.id, email: user.email };    }    const newUser = await Users.create({ ...data });    const res = await Users.save(newUser);    return { id: res.id, email: newUser.email };  }  async signUpCredentials(data: CredSignUserDTO): Promise<IdUserDTO> {    const user = await Users.findOne({ where: { email: data.email } });    if (user) ErrorHandler({ message: 'ALREADY_EXIST_USER' });    const hashed = await this.encrypt(data.password);    const newUser = await Users.create({ ...data, password: hashed });    const res = await Users.save(newUser);    return { id: res.id, email: newUser.email };  }  async signInCredentials(data: CredLogUserDTO): Promise<IdUserDTO> {    const user = await Users.findOne({ where: { email: data.email } });    if (!user) ErrorHandler({ message: 'NOT_FOUND_USER' });    if (!user.password) ErrorHandler({ message: 'SOCIAL_MEDIA' });    const isValid = await this.validate(data.password, user.password);    if (!isValid) ErrorHandler({ message: 'INVALID_PASSWORD' });    const res = await Users.save(user);    return { id: res.id, email: user.email };  }  async deleteUser(id: string): Promise<IdDTO> {    await Users.delete({ id });    return { id };  }}