import { Controller, Post, Body } from '@nestjs/common';
import { StudentsService } from './students.service';
import { EnrollStudentDTO } from './dto/enroll-student.dto';


@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('/enrollment')
  enrollStudent(@Body() enrollStudentDTO: EnrollStudentDTO) {
    return this.studentsService.enrollStudent(enrollStudentDTO);
  }

}
