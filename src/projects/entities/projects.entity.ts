import { BaseEntity, IProject } from 'src/interfaces';
import { UserProjectsEntity } from 'src/users/entities/user-project.entity';
import { UserEntity } from 'src/users/entities/user.entity';
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
