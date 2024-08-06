import { BaseEntity, IUser } from '../../interfaces';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserProjectsEntity } from './user-project.entity';
import { Exclude } from 'class-transformer';

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
  @Exclude()
  password: string;
  @ManyToOne(() => UserProjectsEntity, (userProjects) => userProjects.user)
  projectsIncluded: UserProjectsEntity[];
}
