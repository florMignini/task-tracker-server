import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/projects.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { ErrorHandler } from 'utils/error-handler';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}
  public async createProject(
    createProjectDto: CreateProjectDto,
  ): Promise<ProjectEntity> {
    try {
      //checking if project already exist in DB
      const existingProject = await this.projectRepository.findOne({
        where: {
          name: createProjectDto.title,
        },
      });
      if (existingProject) {
        throw new ErrorHandler({
          type: 'CONFLICT',
          message: 'Project already exists',
        });
      } else {
        const newProject =
          await this.projectRepository.create(createProjectDto);
        return await this.projectRepository.save(newProject);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
