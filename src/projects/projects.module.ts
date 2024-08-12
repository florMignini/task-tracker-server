import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/projects.entity';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
