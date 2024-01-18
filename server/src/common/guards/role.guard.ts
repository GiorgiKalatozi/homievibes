// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!roles) {
      return true; // No specific roles required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (!user) {
      return false; // No user is authenticated, deny access
    }

    return roles.includes(user.role);
  }
}
