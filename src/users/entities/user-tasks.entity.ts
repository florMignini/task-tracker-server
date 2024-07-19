import { BaseEntity } from '../../interfaces';
import { Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { TaskEntity } from '../../tasks/entities/task.entity';

@Entity({ name: 'user_tasks' })
export class UserTasksEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.tasksIncluded)
  user: UserEntity;

  @ManyToOne(() => TaskEntity, (task) => task.userIncluded)
  task: TaskEntity;
}
