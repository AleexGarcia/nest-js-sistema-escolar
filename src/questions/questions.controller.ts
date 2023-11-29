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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonGetIdDto } from 'src/shared/dto/common-get-id.dto';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}
  @ApiOperation({ summary: 'Create a new question.' })
  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }
  @ApiOperation({ summary: 'Get a list of all questions.' })
  @Get()
  findAll() {
    return this.questionsService.findAll();
  }
  @ApiOperation({ summary: 'Get details of a specific question by ID.' })
  @Get(':id')
  findOne(@Param() params: CommonGetIdDto) {
    const { id } = params;
    return this.questionsService.findOne(id);
  }
  @ApiOperation({ summary: 'Update details of a specific question by ID.' })
  @Patch(':id')
  update(
    @Param() params: CommonGetIdDto,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    const { id } = params;
    return this.questionsService.update(id, updateQuestionDto);
  }
  @ApiOperation({ summary: 'Delete a specific question by ID.' })
  @Delete(':id')
  remove(@Param() params: CommonGetIdDto) {
    const { id } = params;
    return this.questionsService.remove(id);
  }
}
