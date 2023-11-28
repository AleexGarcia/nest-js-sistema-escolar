import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { EnrollStudentDTO } from './dto/enroll-student.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}
  @ApiOperation({summary: 'Enroll a student in a course'})
  @Post('/enrollment')
  enrollStudent(@Body() enrollStudentDTO: EnrollStudentDTO) {
    return this.studentsService.enrollStudent(enrollStudentDTO);
  }

  @ApiOperation({summary: 'List all course enrollments for a student'})
  @Get('/:id/enrollment')
  findAllEnroll() {
    return;
  }

}
