import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { UserEntity } from '../entities/user.entity';
import { ProjectEntity } from 'src/projects/entities/projects.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  username: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class UserProjectDto {
  @IsNotEmpty()
  @IsUUID()
  user: UserEntity;

  @IsNotEmpty()
  @IsUUID()
  project: ProjectEntity;
}
