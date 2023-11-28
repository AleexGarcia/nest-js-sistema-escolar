import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiOperation({ summary: 'Create a new course.' })
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @ApiOperation({ summary: 'Get a list of all courses.' })
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @ApiOperation({ summary: 'Get details of a specific course by ID.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Get a list of all students enrolled in a specific course.',
  })
  @Get(':id/students')
  findAllStudentsInCourse(@Param('id') id: string) {
    return this.coursesService.findAllStudentsInCourse(id);
  }

  @ApiOperation({ summary: 'Get a list of all quizzes associated with a specific course.' })
  @Get(':id/quizzes')
  findAllQuizzesInCourse(@Param('id') id: string) {
    return this.coursesService.findAllQuizzesInCourse(id);
  }

  @ApiOperation({ summary: 'Update details of a specific course by ID.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @ApiOperation({ summary: 'Delete a specific course by ID.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
