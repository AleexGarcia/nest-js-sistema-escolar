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
import { CommonGetIdDto } from 'src/shared/dto/common-get-id.dto';

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
  findOne(@Param() params: CommonGetIdDto) {
    const {id} = params;
    return this.coursesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Get a list of all students enrolled in a specific course.',
  })
  @Get(':id/students')
  findAllStudentsInCourse(@Param() params: CommonGetIdDto) {
    const {id} = params;
    return this.coursesService.findAllStudentsInCourse(id);
  }

  @ApiOperation({ summary: 'Get a list of all quizzes associated with a specific course.' })
  @Get(':id/quizzes')
  findAllQuizzesInCourse(@Param() params: CommonGetIdDto) {
    const {id} = params;
    return this.coursesService.findAllQuizzesInCourse(id);
  }

  @ApiOperation({ summary: 'Update details of a specific course by ID.' })
  @Patch(':id')
  update(@Param() params: CommonGetIdDto, @Body() updateCourseDto: UpdateCourseDto) {
    const {id} = params;
    return this.coursesService.update(id, updateCourseDto);
  }

  @ApiOperation({ summary: 'Delete a specific course by ID.' })
  @Delete(':id')
  remove(@Param() params: CommonGetIdDto) {
    const {id} = params;
    return this.coursesService.remove(id);
  }
}
