import { Controller, Get, Param } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}
  @ApiOperation({summary: 'Get a list of courses assigned to a specific teacher by ID.'})
  @Get('/:id/courses')
  assignedCourses(@Param() id: string) {
    return this.teachersService.findAll();
  }

}
