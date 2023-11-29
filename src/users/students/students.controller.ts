import { Controller, Get, Param } from '@nestjs/common';
import { StudentsService } from './students.service';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { getIdDTO } from './dto/get-id.dto';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiOperation({ summary: 'Find all courses enrolled by a student' })
  @Get('/:id/courses')
  findAllCoursesEnrolled(@Param() param: getIdDTO) {
    const { id } = param;
    return this.studentsService.findAllCoursesEnrolled(id);
  }

  @ApiOperation({ summary: 'Find all tasks assigned to a student' })
  @Get('/:id/tasks')
  findAllTasks(@Param() param: getIdDTO) {
    const { id } = param;
    return this.studentsService.findAllTasks(id);
  }
}