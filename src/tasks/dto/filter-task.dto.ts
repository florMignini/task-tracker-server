import { TaskStatus } from '../model/task.model';

// TODO: add to DTO date parameter search
export class TaskFilterDto {
  status?: TaskStatus;
  search?: string;
}
