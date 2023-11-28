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
  findOne(@Param('id') id: string) {
    return this.quizzesService.findOne(id);
  }
  @ApiOperation({ summary: 'Update details of a specific quiz by ID.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizzesService.update(+id, updateQuizDto);
  }
  @ApiOperation({ summary: 'Delete a specific quiz by ID.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizzesService.remove(+id);
  }
}
