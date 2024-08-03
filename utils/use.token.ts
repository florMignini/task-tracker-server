import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';
import { AuthToken, UseToken } from 'src/interfaces';

export const useToken = (token: string): UseToken | string => {
  try {
    const decodeJwt = jwt.decode(token) as AuthToken;

    const currentDate = new Date();
    const expiredDate = new Date(decodeJwt.exp);
    return {
      sub: decodeJwt.sub,
      isExpired: +expiredDate <= +currentDate / 1000,
    };
  } catch (error) {
    throw new UnauthorizedException(`Invalid token`);
  }
};
