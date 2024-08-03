import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UseToken } from 'src/interfaces';
import { UsersService } from 'src/users/users.service';
import { useToken } from 'utils/use.token';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const accessToken = req.headers['access-token'];
    if (!accessToken || Array.isArray(accessToken)) {
      throw new UnauthorizedException(`Invalid token`);
    }

    const validToken: UseToken | string = useToken(accessToken);
    if (typeof validToken === 'string') {
      throw new UnauthorizedException(validToken);
    }
    if (validToken.isExpired) {
      throw new UnauthorizedException(`Token Expired`);
    }
    const { sub } = validToken;
    const user = await this.userService.getSingleUserById(sub);
    if (!user) {
      throw new UnauthorizedException(`User not found`);
    }
    req.idUser = user.id;
    req.user = user;
    return true;
  }
}
