import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../constants';
import { EAppRoles } from '../types';

export const Roles = (...roles: EAppRoles[]) => SetMetadata(ROLES_KEY, roles);
