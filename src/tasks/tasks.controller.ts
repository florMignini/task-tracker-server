import { Controller, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './model/task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  createTask(createtaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createtaskDto);
  }
}
