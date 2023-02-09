import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';

import ERROR_MESSAGES from 'src/constants/errors.en';
import { User } from '../../../db/models';
import ERROR_MESSAGES_SP from '../../../constants/errors.sp';
import { GenerateTokenDTO, IJWTPayload } from '../types';
import { TokenDTO } from '../dtos';

@Injectable()
export class BaseAuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken({ id, role, email = '' }: GenerateTokenDTO): Promise<TokenDTO | null> {
    try {
      const payload: IJWTPayload = {
        id,
        role: [role],
        email
      };

      const accessToken = this.jwtService.sign(payload, {
        privateKey: process.env.JWT_SECRET
      });

      return { token: accessToken };
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async encrypt(password: string) {
    try {
      const salt = await bcrypt.genSalt(10);

      return await bcrypt.hash(password, salt);
    } catch (e) {
      throw new HttpException(
        {
          message: {
            en: ERROR_MESSAGES.UNABLE_ENCRYPT,
            sp: ERROR_MESSAGES_SP.UNABLE_ENCRYPT
          }
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  encryptCesare(word: string) {
    const hashed: string[] = [];
    const arr = word.split('');

    for (let i = 0; i < arr.length; i++) {
      const code = word.charCodeAt(i);
      hashed.push(String.fromCharCode(code + 1));
    }

    return hashed.join('');
  }

  decryptCesare(hash: string) {
    const unhashed: string[] = [];
    const arr = hash.split('');

    for (let i = 0; i < arr.length; i++) {
      const code = hash.charCodeAt(i);
      unhashed.push(String.fromCharCode(code - 1));
    }

    return unhashed.join('');
  }

  async validate(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async updatePassword(user: User, newPassword: string, currentPassword: string): Promise<string> {
    const isValid = await this.validate(currentPassword, user.password);

    if (!isValid) {
      throw new BadRequestException({
        message: {
          en: ERROR_MESSAGES.INVALID_PASSWORD,
          sp: ERROR_MESSAGES_SP.INVALID_PASSWORD
        }
      });
    }

    const hashedPassword = await this.encrypt(newPassword);
    return hashedPassword;
  }
}
