import { UserEntity } from 'src/users/entities/user.entity';

export interface UseToken {
  sub: string;
  isExpired: boolean;
}

export interface AuthToken {
  sub: string;
  exp: number;
  iat: number;
}

export interface AuthResponse {
  AccessToken: string;
  user: UserEntity;
}
