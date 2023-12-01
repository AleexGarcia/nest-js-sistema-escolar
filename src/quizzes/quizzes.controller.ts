import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonGetIdDto } from 'src/shared/dto/common-get-id.dto';
import { CheckPolicies } from 'src/shared/decorators/checkpolicies/checkpolicies.decorator';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Actions } from 'src/casl/enum/action.enum';
import { Quiz } from './entities/quiz.entity';

@ApiTags('quizzes')
@Controller('quizzes')
@ApiBearerAuth()
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}
  @ApiOperation({ summary: 'Create a new quiz.' })
  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Create, Quiz))
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto);
  }
  @ApiOperation({ summary: 'Get a list of all quizzes.' })
  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, Quiz))
  findAll() {
    return this.quizzesService.findAll();
  }
  @ApiOperation({ summary: 'Get details of a specific quiz by ID.' })
  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, Quiz))
  findOne(@Param() params: CommonGetIdDto) {
    const {id} = params;
    return this.quizzesService.findOne(id);
  }
  @ApiOperation({ summary: 'Update details of a specific quiz by ID.' })
  @Patch(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Update, Quiz))
  update(@Param() params: CommonGetIdDto, @Body() updateQuizDto: UpdateQuizDto) {
    const {id} = params;
    return this.quizzesService.update(id, updateQuizDto);
  }
  @ApiOperation({ summary: 'Delete a specific quiz by ID.' })
  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Delete, Quiz))
  remove(@Param() params: CommonGetIdDto) {
    const {id} = params;
    return this.quizzesService.remove(id);
  }
}
