import { BaseEntity, IProject } from '../../interfaces';
import { UserProjectsEntity } from '../../users/entities/user-project.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity implements IProject {
  @Column()
  name: string;
  @Column()
  description: string;
  @OneToMany(() => UserProjectsEntity, (userProjects) => userProjects.project)
  userIncluded: UserEntity[];
}
