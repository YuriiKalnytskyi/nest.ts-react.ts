import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../constants';
import { EAppRoles } from '../types';

/**
 * @param  {RolesGuard} This guard checks if user contains required role
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<EAppRoles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    const request = context.switchToHttp().getRequest();

    if (!requiredRoles) {
      return true;
    }

    const user = request.userData;

    return requiredRoles.some((role: EAppRoles) => user.role?.includes(role));
  }
}
