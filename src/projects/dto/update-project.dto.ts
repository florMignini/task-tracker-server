import { IsDate, IsString, MinLength } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @MinLength(6)
  title: string;
  @IsString()
  @MinLength(6)
  description: string;
  @IsDate()
  deadline?: Date;
}
