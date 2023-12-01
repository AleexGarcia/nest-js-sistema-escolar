import { Controller, Get, Param } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonGetIdDto } from 'src/shared/dto/common-get-id.dto';
import { CheckPolicies } from 'src/shared/decorators/checkpolicies/checkpolicies.decorator';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Actions } from 'src/casl/enum/action.enum';
import { Course } from 'src/courses/entities/course.entity';

@ApiTags('teachers')
@Controller('teachers')
@ApiBearerAuth()
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}
  @ApiOperation({summary: 'Get a list of courses assigned to a specific teacher by ID.'})
  @Get('/:id/courses')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, Course))
  findAllAssignedCourses(@Param() params: CommonGetIdDto) {
    const {id} = params;
    return this.teachersService.findAllAssignedCourses(id);
  }

}
