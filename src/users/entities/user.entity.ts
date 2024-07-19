import { BaseEntity, IUser } from 'src/interfaces';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserTasksEntity } from './user-tasks.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUser {
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ unique: true })
  email: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @ManyToOne(() => UserTasksEntity, (userTasks) => userTasks.user)
  tasksIncluded: UserTasksEntity[];
}
