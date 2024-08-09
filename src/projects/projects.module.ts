import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ControllersController } from './controllers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/projects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  providers: [ProjectsService],
  controllers: [ControllersController],
})
export class ProjectsModule {}
