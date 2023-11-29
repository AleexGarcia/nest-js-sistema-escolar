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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonGetIdDto } from 'src/shared/dto/common-get-id.dto';

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}
  @ApiOperation({ summary: 'Create a new quiz.' })
  @Post()
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto);
  }
  @ApiOperation({ summary: 'Get a list of all quizzes.' })
  @Get()
  findAll() {
    return this.quizzesService.findAll();
  }
  @ApiOperation({ summary: 'Get details of a specific quiz by ID.' })
  @Get(':id')
  findOne(@Param() params: CommonGetIdDto) {
    const {id} = params;
    return this.quizzesService.findOne(id);
  }
  @ApiOperation({ summary: 'Update details of a specific quiz by ID.' })
  @Patch(':id')
  update(@Param() params: CommonGetIdDto, @Body() updateQuizDto: UpdateQuizDto) {
    const {id} = params;
    return this.quizzesService.update(id, updateQuizDto);
  }
  @ApiOperation({ summary: 'Delete a specific quiz by ID.' })
  @Delete(':id')
  remove(@Param() params: CommonGetIdDto) {
    const {id} = params;
    return this.quizzesService.remove(id);
  }
}
