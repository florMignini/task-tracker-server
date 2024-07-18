import { BaseEntity, ITask } from 'src/interfaces';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'tasks' })
export class TaskEntity extends BaseEntity implements ITask {
  @Column()
  title: string;
  @Column()
  description: string;
}
