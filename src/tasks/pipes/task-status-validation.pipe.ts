import { PipeTransform, Injectable } from '@nestjs/common';
import { TaskStatus } from '../model/task.model';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.CANCELED,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.TO_DO,
  ];
  transform(value: any) {
    return value;
  }
}
