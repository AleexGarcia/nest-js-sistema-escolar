import { Controller, Get, Param } from '@nestjs/common';
import { StudentsService } from './students.service';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonGetIdDto } from 'src/shared/dto/common-get-id.dto';
import { CheckPolicies } from 'src/shared/decorators/checkpolicies/checkpolicies.decorator';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Actions } from 'src/casl/enum/action.enum';
import { Enrollment } from 'src/enrollments/entities/enrollment.entity';
import { Task } from 'src/tasks/entities/task.entity';


@ApiTags('students')
@Controller('students')
@ApiBearerAuth()
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiOperation({ summary: 'Find all courses enrolled by a student' })
  @Get('/:id/courses')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, Enrollment))
  findAllCoursesEnrolled(@Param() param: CommonGetIdDto) {
    const { id } = param;
    return this.studentsService.findAllCoursesEnrolled(id);
  }

  @ApiOperation({ summary: 'Find all tasks assigned to a student' })
  @Get('/:id/tasks')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, Task))
  findAllTasks(@Param() param: CommonGetIdDto) {
    const { id } = param;
    return this.studentsService.findAllTasks(id);
  }
}
