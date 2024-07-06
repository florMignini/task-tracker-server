import { Controller, Get, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './model/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/filter-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTaskByFilter(@Query() taskFilterDto: TaskFilterDto): Task[] {
    if (Object.keys(taskFilterDto).length) {
      return this.taskService.getTaskByFilter(taskFilterDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }
  @Post()
  createTask(createtaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createtaskDto);
  }
}
