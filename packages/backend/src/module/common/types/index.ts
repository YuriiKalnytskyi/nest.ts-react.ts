import { PayloadTokenDTO } from '../dtos';

export * from './roles.type';
export * from './user.type';
export * from './auth.type';
export interface IID {
  id: string;
}

export interface IUserRequest extends Request {
  userData: PayloadTokenDTO;
}

export enum ESort {
  ASC = 'ASC',
  DESC = 'DESC'
}
