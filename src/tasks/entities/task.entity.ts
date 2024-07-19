import { BaseEntity, ITask, TaskStatus } from 'src/interfaces';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'tasks' })
export class TaskEntity extends BaseEntity implements ITask {
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ type: 'enum', enum: TaskStatus })
  status: TaskStatus;
}
