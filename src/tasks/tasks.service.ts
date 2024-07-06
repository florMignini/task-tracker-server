import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './model/task.model';
import { TaskFilterDto } from './dto/filter-task.dto';

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
  getAllTasks(): Task[] {
    // Implement logic to fetch all tasks
    return [];
  }
  getTaskByFilter(taskFilterDto: TaskFilterDto): Task[] {
    // TODO: implement also filter by date
    const { status, search } = taskFilterDto;
    // Implement logic to filter tasks based on provided filters
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return tasks;
  }
}
