import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Repository } from 'typeorm';
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
      throw new NotFoundException('Quiz not found');
    }
  }

  async findAll() {
    return await this.questionRepository.find();
  }

  async findOne(id: string) {
    try {
      const question = await this.questionRepository.findOneOrFail({
        where: {
          id: id,
        },
      });
      return question;
    } catch (error) {
      throw new NotFoundException('Questios');
    }
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    try {
      const question = await this.findOne(id);
      for (const [key, value] of Object.entries(updateQuestionDto)) {
        if (value !== undefined) {
          question[key] = value;
        }
      }
      return this.questionRepository.save(question);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred.');
    }
  }

  async remove(id: string) {
    const result = await this.questionRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Task not found');
    return result;
  }
}
