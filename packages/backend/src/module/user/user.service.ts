import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import ERROR_MESSAGES from 'src/constants/errors.en';
import ERROR_MESSAGES_SP from 'src/constants/errors.sp';
import { User } from 'src/db/models';
import { BaseAuthService } from '../common/services/base-auth.service';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import { EAppRoles } from '../common/types';

@Injectable()
export class UserService extends BaseAuthService {
  async register(data: CreateUserDto) {
    const user = await User.findOne({ where: { email: data.email } });
    if (user) {
      throw new HttpException(
        {
          message: {
            en: ERROR_MESSAGES.DUPLICATE_USER,
            sp: ERROR_MESSAGES_SP.DUPLICATE_USER
          }
        },
        HttpStatus.BAD_REQUEST
      );
    }




















    const hashed = await this.encrypt(data.password);

    const newUser = User.create({ ...data, password: hashed });

    const res = await User.save(newUser);

    return { id: res.id, email: res.email };
  }

  async login(data: LoginUserDto) {
    const user = await User.findOne({ where: { email: data.email } });
    if (!user) {
      throw new HttpException(
        {
          message: {
            en: ERROR_MESSAGES.NOT_FOUND_USER,
            sp: ERROR_MESSAGES_SP.NOT_FOUND_USER
          }
        },
        HttpStatus.BAD_REQUEST
      );
    }
    if (!user.password) {
      throw new HttpException(
        {
          message: {
            en: ERROR_MESSAGES.SOCIAL_MEDIA,
            sp: ERROR_MESSAGES_SP.SOCIAL_MEDIA
          }
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const isValid = await this.validate(data.password, user.password);

    if (!isValid) {
      throw new HttpException(
        {
          message: {
            en: ERROR_MESSAGES.INVALID_PASSWORD,
            sp: ERROR_MESSAGES_SP.INVALID_PASSWORD
          }
        },
        HttpStatus.BAD_REQUEST
      );
    }

    return this.generateToken({
      role: EAppRoles.USER,
      id: user.id,
      email: user.email
    });
  }
}
