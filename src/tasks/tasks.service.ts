import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './model/task.model';

@Injectable()
export class TasksService {
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description, startDate, deadline } = createTaskDto;
    // Implement task creation logic here
    return {
      title,
      description,
      startDate,
      deadline,
      status: TaskStatus.TO_DO,
    };
  }
}
