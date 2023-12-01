import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonGetIdDto } from 'src/shared/dto/common-get-id.dto';
import { CheckPolicies } from 'src/shared/decorators/checkpolicies/checkpolicies.decorator';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Actions } from 'src/casl/enum/action.enum';
import { Task } from './entities/task.entity';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({summary:'Create a new task.'})
  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Create, Task))
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }
  @ApiOperation({summary:'Get a list of all tasks.'})
  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, Task))
  findAll() {
    return this.tasksService.findAll();
  }
  @ApiOperation({summary:'Get details of a specific task by ID.'})
  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, Task))
  findOne(@Param() params: CommonGetIdDto) {
    const {id} = params;
    return this.tasksService.findOne(id);
  }
  @ApiOperation({summary:'Update details of a specific task by ID.'})
  @Patch(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Update, Task))
  update(@Param() params: CommonGetIdDto, @Body() updateTaskDto: UpdateTaskDto) {
    const {id} = params;
    return this.tasksService.update(id, updateTaskDto);
  }
  @ApiOperation({summary:'Delete a specific task by ID.'})
  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Delete, Task))
  remove(@Param() params: CommonGetIdDto) {
    const {id} = params;
    return this.tasksService.remove(id);
  }
}
