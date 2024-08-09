import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/projects.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { ErrorHandler } from 'utils/error-handler';
import { CreateProjectDto, UpdateProjectDto } from './dto';

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

  public async getAllProjects(): Promise<ProjectEntity[]> {
    try {
      const projects: ProjectEntity[] = await this.projectRepository.find();
      if (projects.length === 0) {
        throw new ErrorHandler({
          type: 'NOT_FOUND',
          message: 'No projects found',
        });
      }
      return projects;
    } catch (error) {
      throw ErrorHandler.createCustomError(error.message);
    }
  }

  public async getSingleProjectById(id: string): Promise<ProjectEntity> {
    try {
      const project: ProjectEntity = await this.projectRepository
        .createQueryBuilder('project')
        .where({ id })
        .getOne();
      if (!project) {
        throw new ErrorHandler({
          type: 'NOT_FOUND',
          message: `Project with id ${id} was not found`,
        });
      }
      return project;
    } catch (error) {
      throw ErrorHandler.createCustomError(error.message);
    }
  }

  public async updateProject(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<UpdateResult | undefined> {
    try {
      const projectToUpdate = await this.projectRepository.update(
        id,
        updateProjectDto,
      );
      if (projectToUpdate.affected === 0) {
        throw new ErrorHandler({
          type: 'BAD_REQUEST',
          message: `update could not be completed`,
        });
      }
      return projectToUpdate;
    } catch (error) {
      throw ErrorHandler.createCustomError(error.message);
    }
  }

  public async deleteProject(id: string): Promise<DeleteResult | undefined> {
    try {
      const projectToDelete = await this.projectRepository.delete(id);
      if (!projectToDelete) {
        throw new Error('Project not found');
      }
      return projectToDelete;
    } catch (error) {
      throw ErrorHandler.createCustomError(error.message);
    }
  }
}
