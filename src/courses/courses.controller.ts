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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonGetIdDto } from 'src/shared/dto/common-get-id.dto';
import { CheckPolicies } from 'src/shared/decorators/checkpolicies/checkpolicies.decorator';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Actions } from 'src/casl/enum/action.enum';
import { Course } from './entities/course.entity';

@ApiTags('courses')
@Controller('courses')
@ApiBearerAuth()
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiOperation({ summary: 'Create a new course.' })
  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Create, Course))
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @ApiOperation({ summary: 'Get a list of all courses.' })
  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, Course))
  findAll() {
    return this.coursesService.findAll();
  }

  @ApiOperation({ summary: 'Get details of a specific course by ID.' })
  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, Course))
  findOne(@Param() params: CommonGetIdDto) {
    const {id} = params;
    return this.coursesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Get a list of all students enrolled in a specific course.',
  })
  @Get(':id/students')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, Course))
  findAllStudentsInCourse(@Param() params: CommonGetIdDto) {
    const {id} = params;
    return this.coursesService.findAllStudentsInCourse(id);
  }

  @ApiOperation({ summary: 'Get a list of all quizzes associated with a specific course.' })
  @Get(':id/quizzes')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, Course))
  findAllQuizzesInCourse(@Param() params: CommonGetIdDto) {
    const {id} = params;
    return this.coursesService.findAllQuizzesInCourse(id);
  }

  @ApiOperation({ summary: 'Update details of a specific course by ID.' })
  @Patch(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Update, Course))
  update(@Param() params: CommonGetIdDto, @Body() updateCourseDto: UpdateCourseDto) {
    const {id} = params;
    return this.coursesService.update(id, updateCourseDto);
  }

  @ApiOperation({ summary: 'Delete a specific course by ID.' })
  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Delete, Course))
  remove(@Param() params: CommonGetIdDto) {
    const {id} = params;
    return this.coursesService.remove(id);
  }
}
