import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonGetIdDto } from 'src/shared/dto/common-get-id.dto';
import { CheckPolicies } from 'src/shared/decorators/checkpolicies/checkpolicies.decorator';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Actions } from 'src/casl/enum/action.enum';
import { Question } from './entities/question.entity';

@ApiTags('questions')
@Controller('questions')
@ApiBearerAuth()
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}
  @ApiOperation({ summary: 'Create a new question.' })
  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Create, Question))
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }
  @ApiOperation({ summary: 'Get a list of all questions.' })
  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, Question))
  findAll() {
    return this.questionsService.findAll();
  }
  @ApiOperation({ summary: 'Get details of a specific question by ID.' })
  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, Question))
  findOne(@Param() params: CommonGetIdDto) {
    const { id } = params;
    return this.questionsService.findOne(id);
  }
  @ApiOperation({ summary: 'Update details of a specific question by ID.' })
  @Patch(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Update, Question))
  update(
    @Param() params: CommonGetIdDto,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    const { id } = params;
    return this.questionsService.update(id, updateQuestionDto);
  }
  @ApiOperation({ summary: 'Delete a specific question by ID.' })
  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Delete, Question))
  remove(@Param() params: CommonGetIdDto) {
    const { id } = params;
    return this.questionsService.remove(id);
  }
}
