import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/interfaces';

// TODO: add to DTO date parameter search
export class TaskFilterDto {
  @IsOptional()
  @IsIn([
    //*Allowed status array
    TaskStatus.CANCELED,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.TO_DO,
  ])
  status?: TaskStatus;
  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
