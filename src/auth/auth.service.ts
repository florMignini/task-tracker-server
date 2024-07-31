import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  // Validate if user exist & user credentials session are valid
  public async validateUserSession(username: string, password: string) {
    const sessionByUsername = await this.userService.findBy({
      key: 'username',
      value: username,
    });
    const sessionByEmail = await this.userService.findBy({
      key: 'email',
      value: username,
    });
    if (
      sessionByUsername &&
      bcrypt.compareSync(password, sessionByUsername.password)
    ) {
      return sessionByUsername;
    }
    if (
      sessionByEmail &&
      bcrypt.compareSync(password, sessionByEmail.password)
    ) {
      return sessionByEmail;
    }
    return null;
  }

  // sign for JWT
  public async signToken({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: string | number;
  }) {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  // Generate JWT
  public async generateJwt(user: UserEntity): Promise<any> {
    const getUser = await this.userService.getSingleUserById(user.id);
    const payload = {
      sub: getUser.id,
      username: getUser.username,
      email: getUser.email,
    };
    return {
      accessToken: this.signToken({
        payload,
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRES_IN,
      }),
      user,
    };
  }
}
