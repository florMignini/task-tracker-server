import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSessionDto } from './dto/user-session.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { username, password }: UserSessionDto) {
    const validateUser = await this.authService.validateUserSession(
      username,
      password,
    );
    if (!validateUser) {
      throw new UnauthorizedException(`Invalid User credentials`);
    }

    const jwt = await this.authService.generateJwt(validateUser);

    return jwt;
  }
}
