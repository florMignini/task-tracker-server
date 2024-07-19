import { Column, Entity, OneToMany } from 'typeorm';
import { UserTasksEntity } from '../../users/entities/user-tasks.entity';
import { BaseEntity, ITask, TaskStatus } from '../../interfaces';

@Entity({ name: 'tasks' })
export class TaskEntity extends BaseEntity implements ITask {
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ type: 'enum', enum: TaskStatus })
  status: TaskStatus;
  @OneToMany(() => UserTasksEntity, (userTasks) => userTasks.task)
  userIncluded: UserTasksEntity[];
}
