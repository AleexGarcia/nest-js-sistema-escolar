import { Controller, Get, Param } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonGetIdDto } from 'src/shared/dto/common-get-id.dto';

@ApiTags('teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}
  @ApiOperation({summary: 'Get a list of courses assigned to a specific teacher by ID.'})
  @Get('/:id/courses')
  findAllAssignedCourses(@Param() params: CommonGetIdDto) {
    const {id} = params;
    return this.teachersService.findAllAssignedCourses(id);
  }

}
