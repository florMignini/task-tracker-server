import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
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
    value = value.toUpperCase();
    const index = this.allowedStatuses.indexOf(value);
    if (index !== -1) {
      return value;
    } else {
      throw new BadRequestException(
        `Invalid task status. Allowed statuses: ${this.allowedStatuses.join(', ')}`,
      );
    }
  }
}
