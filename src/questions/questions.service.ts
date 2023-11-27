import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Repository } from 'typeorm';
import { Quiz } from 'src/quizzes/entities/quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuizzesService } from 'src/quizzes/quizzes.service';

@Injectable()
export class QuestionsService {
  constructor(
    @Inject(forwardRef(() => QuizzesService))
    private readonly quizzesService: QuizzesService,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const { statement, options, quiz_id } = createQuestionDto;
    const quiz = await this.quizzesService.findOne(quiz_id);
    if (quiz) {
      const question = new Question(statement, options, quiz);
      return this.questionRepository.save(question);
    } else {
      throw new Error('Invalid id quiz');
    }
  }

  findAll() {
    return `This action returns all questions`;
  }

  findOne(id: string) {
    return `This action returns a #${id} question`;
  }

  update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: string) {
    return `This action removes a #${id} question`;
  }
}
