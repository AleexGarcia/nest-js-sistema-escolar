import { Controller, Get, Param } from '@nestjs/common';
import { StudentsService } from './students.service';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiOperation({ summary: 'Find all courses enrolled by a student' })
  @Get('/:id/course')
  findAllCoursesEnrolled(@Param() id: string) {
    this.studentsService.findAllCoursesEnrolled(id);
  }

  @ApiOperation({ summary: 'Find all tasks assigned to a student' })
  @Get('/:id/tasks')
  findAllTasks(@Param() id: string) {
    this.studentsService.findAllTasks(id);
  }

}
