import { BaseAuthDTO } from '../dto';
import { ISocialResponse } from '../types';

export function transform(data: ISocialResponse): BaseAuthDTO {
  return {
    username: data.name,
    email: data.email,
    photo: data.picture
  };
}
