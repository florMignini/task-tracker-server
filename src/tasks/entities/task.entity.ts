import { Column, Entity } from 'typeorm';
import { BaseEntity, ITask, TaskStatus } from '../../interfaces';

@Entity({ name: 'tasks' })
export class TaskEntity extends BaseEntity implements ITask {
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ type: 'enum', enum: TaskStatus })
  status: TaskStatus;
}
