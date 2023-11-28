import { Controller, Get, Param } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get('/:id/courses')
  assignedCourses(@Param() id: string) {
    return this.teachersService.findAll();
  }

}
