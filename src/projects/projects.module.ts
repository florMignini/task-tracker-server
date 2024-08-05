import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ControllersController } from './controllers.controller';

@Module({
  providers: [ProjectsService],
  controllers: [ControllersController],
})
export class ProjectsModule {}
