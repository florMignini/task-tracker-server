import { IsDate, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  title: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  description: string;
  @IsDate()
  startDate?: Date;
  @IsDate()
  deadline?: Date;
}
