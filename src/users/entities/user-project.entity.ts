import { BaseEntity } from '../../interfaces';
import { Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { ProjectEntity } from 'src/projects/entities/projects.entity';

@Entity({ name: 'user_projects' })
export class UserProjectsEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.projectsIncluded)
  user: UserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.userIncluded)
  project: ProjectEntity;
}
