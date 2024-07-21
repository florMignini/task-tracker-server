import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  username: string;
  @IsString()
  @MinLength(6)
  password: string;
}
